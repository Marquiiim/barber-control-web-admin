import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";

import api from "@/services/apiInstance";

import { User, Phone, Calendar, Mail } from "lucide-react";

import SchedulingService from "./schedulingService";
import SchedulingDate from "./schedulingDate";
import SchedulingPaymentType from "./schedulingPaymenteType";
import PaymentModal from "../modals/payment-modal";
import { toast } from "sonner";

export default function SchedulingForm() {

    const [schedulingData, setSchedulingData] = useState({
        name: '',
        email: '',
        phone_number: '',
        service_id: '',
        appointment_date: '',
        hour_id: '',
        payment_type: ''
    })

    const [payment, setPayment] = useState({
        response: [],
        showModal: false
    })

    const [resetKey, setResetKey] = useState(0)

    const handleSelectedService = (serviceId) => {
        setSchedulingData(prev => ({
            ...prev,
            service_id: serviceId
        }))
    }

    const handleSelectedSchedule = (date, hourId) => {
        setSchedulingData(prev => ({
            ...prev,
            appointment_date: date,
            hour_id: hourId
        }))
    }

    const handleSelectedPayment = (payment) => {
        setSchedulingData(prev => ({
            ...prev,
            payment_type: payment
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await api.post('/appointments/to-schedule', schedulingData)
            setSchedulingData({
                name: '',
                email: '',
                phone_number: '',
                service_id: '',
                appointment_date: '',
                hour_id: '',
                payment_type: ''
            })
            setResetKey(prev => prev + 1)
            setPayment({ response: response.payment, showModal: true })
            if (response.success === false && response.payment.status === 'pending') toast.warning(response.message)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">Dados Pessoais</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Nome completo
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    onChange={(e) => setSchedulingData(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Digite seu nome completo"
                                    type="text"
                                    value={schedulingData.name}
                                    required
                                    className="pl-9 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Email
                            </Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    onChange={(e) => setSchedulingData(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Digite seu email"
                                    type="email"
                                    value={schedulingData.email}
                                    required
                                    className="pl-9 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-medium">
                                Número de telefone
                            </Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    onChange={(e) => setSchedulingData(prev => ({ ...prev, phone_number: e.target.value }))}
                                    placeholder="99 999999999"
                                    type="tel"
                                    value={schedulingData.phone_number}
                                    required
                                    className="pl-9 bg-background border-input focus:ring-2 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <h3 className="text-sm font-semibold text-foreground">Agendamento</h3>
                    </div>

                    <div className="grid gap-4">

                        <SchedulingService
                            key={`service-${resetKey}`}
                            getSelectedService={handleSelectedService}
                        />

                        {schedulingData.service_id !== '' && (
                            <SchedulingDate
                                key={`date-${resetKey}`}
                                getSelectedSchedule={handleSelectedSchedule}
                            />
                        )}

                        {schedulingData.appointment_date !== '' &&
                            schedulingData.hour_id !== '' && (
                                <SchedulingPaymentType
                                    key={`payment-${resetKey}`}
                                    getSelectedPayment={handleSelectedPayment} />
                            )}

                    </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full h-11 text-base font-medium shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        Realizar agendamento
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-4">
                        Ao confirmar, você concorda com nossos termos de serviço
                    </p>
                </div>
            </form>

            {payment.showModal &&
                <PaymentModal
                    paymentData={payment.response}
                    open={payment.showModal}
                    onClose={() => setPayment(prev => ({ ...prev, showModal: false }))}
                />}
        </>
    )
}