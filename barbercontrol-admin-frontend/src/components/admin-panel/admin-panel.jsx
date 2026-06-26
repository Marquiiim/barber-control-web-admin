import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react'
import api from "@/services/apiInstance";
import { Badge } from "../ui/badge";
import { Bell, Users } from "lucide-react";
import { toast } from "sonner"
import ModalRescheduling from '../modals/modal-rescheduling'

export default function AdminPanel() {
    const [appointments, setAppointments] = useState({
        data: [],
        meta: null
    })
    const [reschedulingConfig, setReschedulingConfig] = useState({
        availables: null,
        currentAppointment: {
            date: null,
            hour: null
        },
        showModal: false
    })
    const [loading, setLoading] = useState(false)

    const customerService = (data) => {
        try {
            const availableForService = JSON.parse(localStorage.getItem('clientNow'))

            if (availableForService) return toast.error('Finalize o atendimento que está sendo realizado para aceitar o próximo')

            localStorage.setItem('clientNow', JSON.stringify(data))
            toast.success(`Atendimento de ${data.id} - ${data.name} iniciado`)
        } catch (error) {
            console.log(error)
            toast.error('Erro ao iniciar atendimento')
        }
    }

    const schedulingAvailables = async () => {
        try {
            return await api.get('/admin-appointments/rescheduling')
        } catch (error) {
            console.log(error)
        }
    }

    const reschedulingClient = async (date, hour) => {
        try {
            const available = await schedulingAvailables()
            setReschedulingConfig({
                availables: available,
                currentAppointment: {
                    date: date,
                    hour: hour
                },
                showModal: true
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const appointmentsFound = async () => {
            try {
                setLoading(true)
                const response = await api.get('/admin-appointments/clients', {
                    params: {
                        cursor: appointments.meta?.nextCursor
                    }
                })
                setAppointments({ data: response.found, meta: response.meta })
            } catch (error) {
                console.log(error)
                toast.error('Erro ao carregar atendimentos')
            } finally {
                setLoading(false)
            }
        }

        appointmentsFound()

        const intervalId = setInterval(() => appointmentsFound(), 5 * 60 * 1000)

        return () => clearInterval(intervalId)
    }, [])

    if (loading) {
        return (
            <Card className="shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">
                            Atendimentos de Hoje
                        </CardTitle>
                        <Badge variant="secondary" className="h-9 gap-2 text-sm">
                            <Bell className="h-4 w-4" />
                            ...
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center py-12">
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                            <p className="text-sm text-muted-foreground">Carregando atendimentos...</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <>
            <Card className="shadow-sm">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-semibold">
                            Atendimentos de Hoje
                        </CardTitle>
                        <Badge variant="secondary" className="h-9 gap-2 text-sm">
                            <Bell className="h-4 w-4" />
                            {appointments.meta?.total || 0}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-2">
                    {!appointments.data || appointments.data.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 px-4">
                            <div className="rounded-full bg-muted/50 p-4 mb-4">
                                <Users className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">
                                Nenhum atendimento hoje
                            </h3>
                            <p className="text-sm text-muted-foreground text-center max-w-sm">
                                Não há clientes agendados para hoje.
                                Volte mais tarde ou verifique os agendamentos.
                            </p>
                        </div>
                    ) : (
                        appointments.data.map((appointment, index) => (
                            <div
                                key={appointment.id}
                                className={`flex items-center justify-between p-5 ${index === 0
                                    ? 'border-2 border-blue-400 rounded-lg bg-blue-50/30'
                                    : 'border-b hover:bg-gray-50/10 transition-colors'
                                    }`}
                            >
                                <div className="flex-1">
                                    {index === 0 && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[11px] font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
                                                PRÓXIMO
                                            </span>
                                        </div>
                                    )}
                                    <p className={index === 0 ? 'text-[17px] font-semibold' : 'text-[15px] font-medium'}>
                                        {appointment.name}
                                    </p>
                                    <p className={index === 0 ? 'text-[14px] text-muted-foreground' : 'text-[13px] text-muted-foreground'}>
                                        {appointment.services}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className={index === 0 ? 'text-[15px] text-muted-foreground' : 'text-[14px] text-muted-foreground'}>
                                        {appointment.schedules}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => customerService(appointment)}
                                            className="h-8 px-4 text-[13px] bg-green-600 hover:bg-green-700"
                                        >
                                            Atender
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="h-8 px-4 text-[13px] border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                                            onClick={() => reschedulingClient(appointment.appointment_date, appointment.schedules)}
                                        >
                                            Reagendar
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            className="h-8 px-4 text-[13px]"
                                        >
                                            Ausência
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>

            {reschedulingConfig.availables && reschedulingConfig.showModal && (
                < ModalRescheduling
                    open={reschedulingConfig.showModal}
                    onClose={() => setReschedulingConfig({ availables: null, showModal: false })}
                    availableDates={reschedulingConfig.availables.dates}
                    availableHours={reschedulingConfig.availables.hours}
                    currentAppointment={reschedulingConfig.availables.currentAppointment}
                />
            )}
        </>
    );
}