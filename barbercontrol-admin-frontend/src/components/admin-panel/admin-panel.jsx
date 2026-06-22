import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react'
import api from "@/services/apiInstance";

export default function AdminPanel() {

    const [appointments, setAppointments] = useState([])
    const [cursor, setCursor] = useState(null)

    const appointmentsFound = async () => {
        try {
            const response = await api.get('/admin-appointments/clients', {
                params: {
                    cursor: cursor
                }
            })
            setCursor(response?.nextCursor)
            setAppointments(response.appointments)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        appointmentsFound()
    }, [])

    return (
        <Card className="shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-semibold">
                    Atendimentos de Hoje
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-4 border-2 border-blue-400 rounded-lg bg-blue-50/30">
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-full">
                                PRÓXIMO
                            </span>
                            <p className="font-semibold text-[15px]">Nome do cliente</p>
                        </div>
                        <p className="text-[13px] text-muted-foreground pl-1">Serviço</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-[13px] text-muted-foreground mr-1">Horário do serviço</span>
                        <Button size="sm" className="h-8 px-3 text-[13px] bg-green-600 hover:bg-green-700">
                            Finalizar
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 px-3 text-[13px] border-yellow-400 text-yellow-600">
                            Reagendar
                        </Button>
                        <Button size="sm" variant="destructive" className="h-8 px-3 text-[13px]">
                            Ausência
                        </Button>
                    </div>
                </div>

                <div
                    className="flex items-center justify-between p-4 border-b"
                >
                    <div>
                        <p className="font-medium text-sm">Nome do cliente</p>
                        <p className="text-xs text-muted-foreground">Serviço</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground mr-1">
                            Horário do serviço
                        </span>
                        <Button size="sm" className="h-7 px-2.5 text-xs bg-green-600 hover:bg-green-700">
                            Finalizar
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2.5 text-xs border-yellow-400 text-yellow-600">
                            Reagendar
                        </Button>
                        <Button size="sm" variant="destructive" className="h-7 px-2.5 text-xs">
                            Ausência
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}