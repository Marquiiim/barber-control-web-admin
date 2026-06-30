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
import { useState } from "react"
import api from "@/services/apiInstance"

export default function RescheduleModal({
    open,
    onClose,
    availableDates,
    availableHours,
    currentAppointment
}) {

    const [reschedulingData, setReschedulingData] = useState({
        appointmentId: currentAppointment.id,
        newDate: null,
        newHour: null
    })

    const [loading, setLoading] = useState(false)

    const rescheduling = async () => {
        try {
            setLoading(true)
            const response = await api.patch('/admin-appointments/', {
                params: {
                    id: reschedulingData.appointmentId,
                    date: reschedulingData.newDate,
                    hour: reschedulingData.newHour
                }
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

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
                        {new Date(currentAppointment?.date).toLocaleDateString('pt-BR')} às {currentAppointment?.hour}
                    </p>
                </div>

                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Nova Data
                        </Label>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableDates.map((date, index) => (
                                <Button
                                    key={index}
                                    type="button"
                                    variant={reschedulingData.newDate === date ? 'default' : 'outline'}
                                    className="w-full text-sm"
                                    onClick={() => setReschedulingData(prev => ({ ...prev, newDate: date }))}
                                    disabled={loading}
                                >
                                    {date}
                                </Button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Selecione uma data disponível
                        </p>
                    </div>

                    {reschedulingData.newDate &&
                        <div className="space-y-2">
                            <Label className="text-sm font-medium flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Novo Horário
                            </Label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                                {availableHours.map((hour, index) => (
                                    <Button
                                        key={index}
                                        type="button"
                                        variant={reschedulingData.newHour === hour ? 'default' : 'outline'}
                                        className="w-full text-sm"
                                        onClick={() => setReschedulingData(prev => ({ ...prev, newHour: hour }))}
                                        disabled={loading}
                                    >
                                        {hour}
                                    </Button>
                                ))}
                            </div>
                        </div>}

                    <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                            Novo agendamento: {reschedulingData?.newHour} às {reschedulingData?.newDate}
                        </p>
                    </div>
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
                        disabled={loading || !reschedulingData.newHour || !reschedulingData.newDate}  // ✅ Corrigi a lógica
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