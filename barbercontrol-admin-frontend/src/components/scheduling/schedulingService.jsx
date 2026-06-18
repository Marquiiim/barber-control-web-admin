import { useEffect, useState } from "react"
import api from "@/services/apiInstance"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SchedulingService({ getSelectedService, resetTrigger }) {
    const [optionsFound, setOptionsFound] = useState({
        services: [],
        selectedService: null
    })

    useEffect(() => {
        if (resetTrigger) {
            setOptionsFound(prev => ({
                ...prev,
                selectedService: null
            }))
        }
    }, [resetTrigger])

    const getServices = async () => {
        try {
            const response = await api.get('/appointments/services')
            setOptionsFound(prev => ({
                ...prev,
                services: response
            }))
        } catch (error) {
            console.log(error)
        }
    }

    const serviceSelected = (service) => {
        if (optionsFound.selectedService === service) {
            setOptionsFound(prev => ({
                ...prev,
                selectedService: null
            }))
            getSelectedService('')
            return
        }

        setOptionsFound(prev => ({
            ...prev,
            selectedService: service
        }))
        getSelectedService(service)
    }

    useEffect(() => {
        getServices()
    }, [])

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                    Serviços
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {optionsFound.services.map(service => (
                        <Button onClick={() => serviceSelected(service.id)}
                            key={service.id}
                            className='w-full whitespace-normal break-words h-auto py-2 px-3 text-sm'
                            variant={optionsFound.selectedService === service.id ? 'default' : 'outline'}
                            title={service.description}>
                            {service.availables}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}