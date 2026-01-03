import { AlertTriangle, Clock, Hospital, PhoneCall } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { motion } from "framer-motion";

export default function EmergencyServicePage() {
  return (
    <>
      <head>
        <title>Emergency</title>
      </head>
      <div className="min-h-screen bg-background px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto text-center"
        >
          <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
          <h1 className="text-4xl font-bold mt-6">Emergency Assistance</h1>
          <p className="mt-4 text-muted-foreground text-lg">
            Immediate help when every second matters. Our emergency system is
            designed to connect you with the right medical support as fast as
            possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-16 max-w-5xl mx-auto">
          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <PhoneCall className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold">
                  Instant Emergency Call
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Trigger an emergency request with one tap to immediately
                  notify nearby doctors or emergency responders.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <Hospital className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold">Hospital Redirection</h3>
                <p className="mt-2 text-muted-foreground">
                  We guide you to the nearest suitable hospital or clinic based
                  on your condition and location.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <Clock className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold">24/7 Availability</h3>
                <p className="mt-2 text-muted-foreground">
                  Emergency support is available around the clock, ensuring you
                  are never alone during critical moments.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }}>
            <Card className="rounded-2xl shadow-md">
              <CardContent className="p-6">
                <AlertTriangle className="h-10 w-10 mb-4 text-red-500" />
                <h3 className="text-xl font-semibold">
                  Critical Case Handling
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Severe cases are prioritized and escalated immediately to
                  ensure rapid medical intervention.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <p className="text-sm text-muted-foreground">
            If you are in immediate danger, please contact your local emergency
            number right away.
          </p>
        </motion.div>
      </div>
    </>
  );
}
