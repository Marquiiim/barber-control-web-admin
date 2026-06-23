import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from 'react'
import api from "@/services/apiInstance";
import { Badge } from "../ui/badge";
import { Bell } from "lucide-react";

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
            setCursor(response.meta?.nextCursor)
            setAppointments(response.found)
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
                <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                        Atendimentos de Hoje
                    </CardTitle>
                    <Badge variant="secondary" className="h-9 gap-2 text-sm">
                        <Bell className="h-4 w-4" />
                        4
                    </Badge>
                </div>
            </CardHeader>


            <CardContent className="space-y-2">
                {appointments.map((appointment, index) => (
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
                                <Button className="h-8 px-4 text-[13px] bg-green-600 hover:bg-green-700">
                                    Finalizar
                                </Button>
                                <Button variant="outline" className="h-8 px-4 text-[13px] border-yellow-400 text-yellow-600 hover:bg-yellow-50">
                                    Reagendar
                                </Button>
                                <Button variant="destructive" className="h-8 px-4 text-[13px]">
                                    Ausência
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}