import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar, Clock, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import api from "@/services/apiInstance"

export default function RescheduleModal({
    open,
    onClose,
    currentAppointment
}) {

    const [appointmentData, setAppointmentData] = useState({
        current: {
            id: currentAppointment?.id || null,
            date: currentAppointment?.appointment_date || null,
            hour: currentAppointment?.schedules || null
        },
        update: {
            newDate: null,
            newHourId: null,
            newHour: null
        }
    })

    const [reschedulingAvailable, setReschedulingAvailable] = useState({
        dates: [],
        hours: [],
        selectedDate: null,
        selectedHour: null
    })

    const [loading, setLoading] = useState(false)

    const rescheduling = async () => {
        try {
            setLoading(true)
            const response = await api.patch(`/admin-appointments/${appointmentData.current.id}`, {
                date: appointmentData.update.newDate,
                hourId: appointmentData.update.newHourId
            })
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const fetchAvailables = async (date) => {
        try {
            const dateToSend = date || new Date().toISOString().split('T')[0]

            const response = await api.get('/admin-appointments/appointments/available', {
                params: {
                    date: dateToSend
                }
            })

            setReschedulingAvailable(prev => ({
                ...prev,
                dates: response?.dates || [],
                hours: response?.hours || []
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const dataSelected = (dateValue) => {
        if (reschedulingAvailable.selectedDate === dateValue) {
            setReschedulingAvailable(prev => ({
                ...prev,
                selectedDate: null,
                selectedHour: null
            }))
            setAppointmentData(prev => ({
                ...prev,
                update: {
                    newDate: null,
                    newHourId: null,
                    newHour: null
                }
            }))
            fetchAvailables(new Date().toISOString().split('T')[0])
            return
        }

        setReschedulingAvailable(prev => ({
            ...prev,
            selectedDate: dateValue,
            selectedHour: null
        }))
        setAppointmentData(prev => ({
            ...prev,
            update: {
                newDate: dateValue,
                newHourId: null,
                newHour: null
            }
        }))
        fetchAvailables(dateValue)
    }

    const hourSelected = (hourId) => {
        if (reschedulingAvailable.selectedHour === hourId) {
            setReschedulingAvailable(prev => ({
                ...prev,
                selectedHour: null
            }))
            setAppointmentData(prev => ({
                ...prev,
                update: {
                    ...prev.update,
                    newHourId: null,
                    newHour: null
                }
            }))
            return
        }

        const selectedHourObj = reschedulingAvailable.hours.find(h => h.id === hourId)

        if (selectedHourObj && reschedulingAvailable.selectedDate) {
            setReschedulingAvailable(prev => ({
                ...prev,
                selectedHour: hourId
            }))
            setAppointmentData(prev => ({
                ...prev,
                update: {
                    ...prev.update,
                    newHourId: hourId,
                    newHour: selectedHourObj.hour
                }
            }))
        }
    }

    useEffect(() => {
        if (open) {
            fetchAvailables(new Date().toISOString().split('T')[0])
        }
    }, [open])

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-zinc-900 border-zinc-800 text-white sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        Reagendar Atendimento
                    </DialogTitle>
                    <DialogDescription>
                        Selecione a nova data e horário para o reagendamento.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        <span className="font-medium">Agendamento atual:</span>{' '}
                        {appointmentData.current.date ?
                            new Date(appointmentData.current.date).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) :
                            'Data não disponível'
                        } às {appointmentData.current.hour}
                    </p>
                </div>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Nova Data
                        </Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {reschedulingAvailable.dates.map((date, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    variant={reschedulingAvailable.selectedDate === date.formattedFromValue ? 'default' : 'outline'}
                                    className="w-full text-sm"
                                    onClick={() => dataSelected(date.formattedFromValue)}
                                    disabled={loading}
                                >
                                    {date.formattedFromDate}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {reschedulingAvailable.selectedDate && (
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Novo Horário
                            </Label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {reschedulingAvailable.hours.map((hour) => (
                                    <Button
                                        key={hour.id}
                                        type="button"
                                        variant={reschedulingAvailable.selectedHour === hour.id ? 'default' : 'outline'}
                                        className="w-full text-sm"
                                        onClick={() => hourSelected(hour.id)}
                                        disabled={loading}
                                    >
                                        {hour.hour}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {appointmentData.update.newDate && appointmentData.update.newHour && (
                        <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                                Novo agendamento: {new Date(appointmentData.update.newDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })} às {appointmentData.update.newHour}
                            </p>
                        </div>
                    )}
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full sm:w-auto"
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={rescheduling}
                        disabled={loading || !appointmentData.update.newHourId || !appointmentData.update.newDate}
                        className="w-full sm:w-auto"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Reagendando...
                            </>
                        ) : (
                            'Confirmar Reagendamento'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}