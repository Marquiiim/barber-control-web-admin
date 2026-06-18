import SchedulingForm from '@/components/scheduling/schedulingForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Toaster } from "@/components/ui/sonner"

export default function App() {
  return (
    <>
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center text-2xl'>
              Barber Control
            </CardTitle>
            <p className='text-center text-muted-foreground text-sm'>
              Realize seu agendamento
            </p>
          </CardHeader>
          <CardContent className='space-y-4'>
            <SchedulingForm />
          </CardContent>
        </Card>
      </div>

      <Toaster
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={4000}
      />

    </>
  )
}
