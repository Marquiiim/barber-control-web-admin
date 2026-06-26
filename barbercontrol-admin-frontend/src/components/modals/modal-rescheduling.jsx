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
import { Calendar, Clock } from "lucide-react"
import { useState } from "react"

export default function RescheduleModal({
    open,
    onClose,
    availableDates,
    availableHours,
    currentAppointment
}) {

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
                        {currentAppointment?.date} às {currentAppointment?.hour}
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
                                    variant={'selectedDate' === date ? 'default' : 'outline'}
                                    className="w-full text-sm"
                                    onClick={''}
                                >
                                    {date}
                                </Button>
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Selecione uma data disponível
                        </p>
                    </div>

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
                                    variant={'selectedHour' === hour ? 'default' : 'outline'}
                                    className="w-full text-sm"
                                    onClick={''}
                                >
                                    {hour}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                            Novo agendamento: 12 às 12
                        </p>
                    </div>
                </div>

                <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={''}
                        className="w-full sm:w-auto"
                    >
                        Cancelar
                    </Button>
                    <Button
                        onClick={''}
                        disabled={''}
                        className="w-full sm:w-auto"
                    >
                        Confirmar Reagendamento
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}