"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Loader2, Calendar, User, Phone } from 'lucide-react'
import NavBarForDoctor from '@/components/NavbarForDoctor'
import { AppointmentForDoctor } from '@/app/types'



export default function DoctorDashboard() {
  const router = useRouter()
  const [doctor, setDoctor] = useState<{ name: string } | null>(null)
  const [appointments, setAppointments] = useState<AppointmentForDoctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const doctorData = localStorage.getItem('doctorData')
    if (!doctorData) {
      router.push('/doctor/auth')
      return
    }
    setDoctor(JSON.parse(doctorData))

    const fetchAppointments = async () => {
      try {
        const doctorId = JSON.parse(doctorData).id
        const response = await fetch(
          `http://localhost:8000/api/appointments/doctor/${doctorId}?status=scheduled`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('doctorToken')}`,
            },
          }
        )

        if (!response.ok) throw new Error('Failed to fetch appointments')

        const result = await response.json()
        const sortedAppointments = result.data.appointments.sort(
          (a: AppointmentForDoctor, b: AppointmentForDoctor) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        )
        setAppointments(sortedAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [router])

  const getAppointmentStatus = (date: string, status: string) => {
    const appointmentDate = new Date(date)
    const now = new Date()
    const isPast = appointmentDate < now

    return {
      label: isPast ? 'Previous' : 'Upcoming',
      className: isPast
        ? 'bg-gray-100 text-gray-700'
        : 'bg-blue-50 text-blue-700',
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-[-50px]">
      <NavBarForDoctor />
      <div className="container mx-auto px-4 py-8">
        <Card className="w-full shadow-lg">
          <CardHeader className="bg-gradient-to-r from-primary to-primary-foreground text-white rounded-t-xl">
            <CardTitle className="text-3xl font-bold">
              Welcome back, {doctor?.name}! 👋
            </CardTitle>
            <p className="text-primary-foreground/80 mt-2">
              Here are your upcoming appointments
            </p>
          </CardHeader>
          <CardContent className="p-6">
            {appointments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-xl font-semibold">No appointments found.</p>
                <p className="mt-2">Enjoy your free time!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Date & Time</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => {
                    const status = getAppointmentStatus(
                      appointment.date,
                      appointment.status
                    )
                    return (
                      <TableRow key={appointment._id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <div>
                              <div>{format(new Date(appointment.date), 'MMM dd, yyyy')}</div>
                              <div className="text-sm text-muted-foreground">
                                {appointment.slot.startTime} - {appointment.slot.endTime}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="mr-2 h-4 w-4 text-muted-foreground" />
                            {appointment.patientId.profile.firstName}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            {appointment.patientId.profile.phone}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge
                            variant="outline"
                            className={`${status.className} px-2 py-1`}
                          >
                            {status.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

