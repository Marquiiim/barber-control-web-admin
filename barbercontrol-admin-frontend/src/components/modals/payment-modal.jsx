import { useState, useEffect, useRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Copy, Check, Clock, QrCode } from "lucide-react";
import api from "@/services/apiInstance";

export default function PixPayment({ open, onClose, paymentData }) {
    const [copied, setCopied] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);
    const [status, setStatus] = useState(paymentData?.status || "pendente");
    const intervalRef = useRef(null)

    useEffect(() => {
        if (!paymentData?.expiration_date) return;

        const updateTimer = () => {
            const expiration = new Date(paymentData.expiration_date);
            const now = new Date();
            const diff = expiration - now;

            if (diff <= 0) {
                setTimeLeft({ minutes: 0, seconds: 0 });
                return;
            }

            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            setTimeLeft({ minutes, seconds });
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [paymentData?.expiration_date]);

    const handleCopyCode = async () => {
        if (!paymentData?.qr_code) return;
        await navigator.clipboard.writeText(paymentData.qr_code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const appointmentDelete = async () => {
        try {
            const response = await api.delete(`/appointments/${paymentData.payment_uuid}`)
            if (response.success === true) onClose()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!paymentData?.payment_uuid) return
        const checkPaymentStatus = async () => {
            try {
                const response = await api.get(`/payment/${paymentData.payment_uuid}`)
                setStatus(response.status)
                if (response.status === 'aprovado') {
                    clearInterval(intervalRef.current)
                    toast.success(response.message)
                }
                if (response.status === 'expirado') {
                    clearInterval(intervalRef.current)
                    onClose()
                    toast.warning(response.message)
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        intervalRef.current = setInterval(checkPaymentStatus, 5000)

        return () => clearInterval(intervalRef.current)
    }, [paymentData.payment_uuid])

    if (status === 'aprovado') {
        return (
            <Dialog open={open} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center text-green-600">
                            ✅ Pagamento Confirmado!
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Seu pagamento foi aprovado. Agendamento confirmado!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button onClick={onClose}>Fechar</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Pagar com PIX
                    </DialogTitle>
                    <DialogDescription>
                        Escaneie o QR Code ou copie o código para pagar
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {timeLeft && (
                        <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                                <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    Expira em:
                                </span>
                                <span className="font-mono font-medium">
                                    {timeLeft.minutes}:{String(timeLeft.seconds).padStart(2, "0")}
                                </span>
                            </div>
                            <Progress value={(timeLeft.minutes / 30) * 100} className="h-1" />
                        </div>
                    )}

                    <div className="text-center bg-muted rounded-lg p-3">
                        <p className="text-sm text-muted-foreground">Valor</p>
                        <p className="text-2xl font-bold">
                            R$ {Number(paymentData?.amount).toFixed(2) || "0,00"}
                        </p>
                    </div>

                    {paymentData?.qr_code_base64 && (
                        <div className="flex justify-center">
                            <img
                                src={`data:image/png;base64,${paymentData.qr_code_base64}`}
                                alt="QR Code PIX"
                                className="w-48 h-48"
                            />
                        </div>
                    )}

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleCopyCode}
                    >
                        {copied ? (
                            <><Check className="h-4 w-4 mr-2" /> Código copiado!</>
                        ) : (
                            <><Copy className="h-4 w-4 mr-2" /> Copiar código PIX</>
                        )}
                    </Button>

                    {(status === 'pendente' || status === 'pending') && (
                        <p className="text-center text-sm text-muted-foreground">
                            Aguardando pagamento...
                        </p>
                    )}
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button variant="destructive" onClick={appointmentDelete}>
                        Cancelar agendamento
                    </Button>
                    <Button variant="ghost" onClick={onClose}>
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}