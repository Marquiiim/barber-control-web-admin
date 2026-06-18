import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { QrCode, CreditCard, Banknote, Barcode } from "lucide-react";
import { useEffect, useState } from "react";

export default function SchedulingPaymentType({ getSelectedPayment, resetTrigger }) {
    const [typePayment, setTypePayment] = useState('')

    useEffect(() => {
        if (resetTrigger) {
            setTypePayment('')
            getSelectedPayment('')
        }
    }, [resetTrigger])

    const setPayment = (type) => {
        if (type === typePayment) {
            setTypePayment('')
            getSelectedPayment('')
            return
        }
        setTypePayment(type)
        getSelectedPayment(type)
    }


    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                    Tipo de pagamento
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    <Button
                        onClick={() => setPayment('pix')}
                        className='w-full whitespace-normal break-words h-auto py-2 px-3 text-sm'
                        value='pix'
                        variant={typePayment === 'pix' ? 'default' : 'outline'}>
                        <QrCode />
                        PIX
                    </Button>
                    <Button
                        onClick={() => setPayment('d_bito')}
                        className='w-full whitespace-normal break-words h-auto py-2 px-3 text-sm'
                        variant={typePayment === 'd_bito' ? 'default' : 'outline'}>
                        <Barcode />
                        DÉBITO
                    </Button>
                    <Button
                        onClick={() => setPayment('cr_dito')}
                        className='w-full whitespace-normal break-words h-auto py-2 px-3 text-sm'
                        variant={typePayment === 'cr_dito' ? 'default' : 'outline'}>
                        <CreditCard />
                        CRÉDITO
                    </Button>
                    <Button
                        onClick={() => setPayment('dinheiro')}
                        className='w-full whitespace-normal break-words h-auto py-2 px-3 text-sm'
                        variant={typePayment === 'dinheiro' ? 'default' : 'outline'}>
                        <Banknote />
                        DINHEIRO
                    </Button>
                </div>
            </div>
        </div>
    )
}