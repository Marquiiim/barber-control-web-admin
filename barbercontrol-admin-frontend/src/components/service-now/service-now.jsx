import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Mail,
    Phone,
    Scissors,
    Calendar,
    Clock,
    CreditCard,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function ServiceInfo() {
    const [clientNow, setClientNow] = useState(null);

    useEffect(() => {
        const clientData = localStorage.getItem('clientNow');
        if (clientData) {
            setClientNow(JSON.parse(clientData));
        }
    }, []);

    if (!clientNow) {
        return (
            <Card className="shadow-sm border-gray-100">
                <CardHeader className="from-gray-900 to-gray-800">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                            <span>Serviço Atual</span>
                            <Badge className="bg-gray-500 text-[10px]">
                                Aguardando
                            </Badge>
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground py-8">
                        Nenhum cliente em atendimento
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-gray-100">
            <CardHeader className="from-gray-900 to-gray-800">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2 text-white">
                        <span>Serviço Atual</span>
                        <Badge className="bg-green-500 text-[10px]">
                            Em atendimento
                        </Badge>
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-3">
                <div className="flex items-center gap-3 pb-2">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm flex-shrink-0">
                        {clientNow.name?.substring(0, 2).toUpperCase() || 'CL'}
                    </div>
                    <div>
                        <p className="font-semibold text-[15px]">{clientNow.name || 'Nome não informado'}</p>
                        <p className="text-[12px] text-muted-foreground">Cliente #{clientNow.id || 'N/A'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-[13px]">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{clientNow.email || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{clientNow.phone_number || 'Não informado'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Scissors className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{clientNow.services || 'Não definido'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{new Date(clientNow.appointment_date.split('T')[0]).toLocaleDateString('pt-BR') || 'Não definida'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{clientNow.schedules || 'Não definido'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] col-span-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                            Pagamento:
                            <span className="font-medium text-green-600">
                                {clientNow.payment_type || 'Pendente'}
                            </span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-3">
                    <Button size="sm" className="h-8 px-3 text-[13px] bg-green-600 hover:bg-green-700 flex-1">
                        Finalizar
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 px-3 text-[13px] border-yellow-400 text-yellow-600">
                        Reagendar
                    </Button>
                    <Button size="sm" variant="destructive" className="h-8 px-3 text-[13px]">
                        Cancelar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}