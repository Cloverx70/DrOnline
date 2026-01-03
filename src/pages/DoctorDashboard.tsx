import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import CreateStudy from "@/components/DoctorDashboard/CreateStudy";
import EditStudy from "@/components/DoctorDashboard/EditStudy";
import { GetDoctorById } from "@/api/doctor";
import Spinner from "@/components/Spinner";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";

const DoctorDashboardPage = () => {
  const navigate = useNavigate();

  const { data: user, isLoading: AuthLoading } = useAuthStatus();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Redirect non-doctors
  useEffect(() => {
    // not logged in
    if (!user) {
      navigate("/");
      return;
    }

    // logged in but not doctor
    if (user.role !== "doctor") {
      navigate("/");
      return;
    }
  }, [user, AuthLoading, navigate]);

  const doctorId = user?.doctor?.id;

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["DOCTORPROFILE", doctorId],
    queryFn: () => GetDoctorById(doctorId!),
    enabled: !!doctorId,
  });

  if (AuthLoading || isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <head>
        <title>Doctor dashboard</title>
      </head>
      <section className="w-full min-h-screen flex flex-col items-center p-10 gap-7 font-lexend">
        {/* Header */}
        <div className="flex items-center justify-between w-full gap-3 mb-10">
          <h1 className="text-4xl font-bold">Doctor Dashboard</h1>
          <div className="flex gap-5">
            {/* Create Study */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="bg-custom-blue text-white hover:bg-custom-gray">
                  Create Study
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new study</DialogTitle>
                </DialogHeader>
                <CreateStudy setCreateOpen={setIsCreateOpen} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Studies List */}
        <div className="w-full h-[500px] overflow-y-auto flex flex-col gap-5">
          {doctor && doctor.studies.length > 0 ? (
            doctor.studies.map((study) => (
              <Dialog
                key={study.id}
                open={openDialogId === study.id}
                onOpenChange={(open) => setOpenDialogId(open ? study.id : null)}
              >
                <DialogTrigger asChild>
                  <div className="border p-4 rounded-xl flex flex-col gap-1 hover:shadow-lg transition cursor-pointer">
                    <p className="font-semibold text-2xl">{study.title}</p>
                    <p className="text-sm text-custom-gray">
                      {study.description}
                    </p>
                    <span className="text-xs font-semibold uppercase text-custom-black">
                      {study.status.replace("_", " ")}
                    </span>
                    {study.dueDate && (
                      <p className="text-xs text-custom-gray">
                        Due: {new Date(study.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Study</DialogTitle>
                  </DialogHeader>
                  <EditStudy
                    sid={study.id}
                    setEditOpen={() => setOpenDialogId(null)}
                  />
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="w-full h-[400px] flex items-center justify-center">
              <p className="text-sm text-custom-gray">
                No studies created yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DoctorDashboardPage;
