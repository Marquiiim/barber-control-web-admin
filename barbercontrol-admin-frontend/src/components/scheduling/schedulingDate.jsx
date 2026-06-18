import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import api from "@/services/apiInstance"

export default function SchedulingDate({ getSelectedSchedule, resetTrigger }) {
    const [optionsFound, setOptionsFound] = useState({
        dates: [],
        hours: [],
        selectedDate: null,
        selectedHour: null
    })

    useEffect(() => {
        if (resetTrigger) {
            setOptionsFound(prev => ({
                ...prev,
                selectedDate: null,
                selectedHour: null
            }))
        }
    }, [resetTrigger])

    const getAppointments = async (date) => {
        try {
            const response = await api.get('/appointments/schedules', {
                params: {
                    date: date ?? new Date().toISOString().split('T')[0]
                }
            })
            setOptionsFound(prev => ({
                ...prev,
                dates: response.dates,
                hours: response.hours
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const dataSelected = (date) => {
        if (optionsFound.selectedDate === date) {
            setOptionsFound(prev => ({
                ...prev,
                selectedDate: null,
                selectedHour: null
            }))
            return getAppointments()
        }

        setOptionsFound(prev => ({
            ...prev,
            selectedDate: date
        }))
        getAppointments(date)
    }

    const hourSelected = (hourId) => {
        if (optionsFound.selectedHour === hourId) {
            setOptionsFound(prev => ({
                ...prev,
                selectedHour: null
            }))
            getSelectedSchedule('', '')
            return
        }

        setOptionsFound(prev => ({
            ...prev,
            selectedHour: hourId
        }))

        if (optionsFound.selectedDate) getSelectedSchedule(optionsFound.selectedDate, hourId)
    }



    useEffect(() => {
        getAppointments()
    }, [])

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                    Data
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {optionsFound.dates.map((date, index) => (
                        <Button
                            onClick={() => dataSelected(date.formattedFromValue)}
                            key={index}
                            className='w-full'
                            variant={optionsFound.selectedDate === date.formattedFromValue ? 'default' : 'outline'}>
                            {date.formattedFromDate}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                    Horário
                </Label>
                {optionsFound.selectedDate &&
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {optionsFound.hours.map(hour => (
                            <Button
                                onClick={() => hourSelected(hour.id)}
                                key={hour.id}
                                variant={optionsFound.selectedHour === hour.id ? 'default' : 'outline'}>
                                {hour.time}
                            </Button>
                        ))}
                    </div>}
            </div>
        </div>
    );
}