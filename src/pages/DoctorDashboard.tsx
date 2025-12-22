import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import CreateStudy from "@/components/DoctorDashboard/CreateStudy";
import EditStudy from "@/components/DoctorDashboard/EditStudy";
import { GetDoctorById } from "@/api/doctor";
import { IoMedicalOutline } from "react-icons/io5";
import Spinner from "@/components/Spinner";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

// Zod schema for creating a study

const DoctorDashboardPage = () => {
  const { data: user } = useAuthStatus();

  const { data: doctor, isLoading } = useQuery({
    queryKey: ["DOCTORPROFILE"],
    queryFn: () => GetDoctorById(user.doctor.id!),
    enabled: !!user.doctor.id,
  });

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <section className="w-full min-h-screen flex flex-col items-center py-10 font-lexend">
      {/* Header */}
      <div className="flex items-center gap-3 mb-10">
        <IoMedicalOutline size={38} className="text-custom-blue" />
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
      </div>

      {/* Actions */}
      <div className="flex gap-5 mb-10">
        {/* Create Study */}
        <Dialog>
          <DialogTrigger>
            <Button className="bg-custom-blue text-white hover:bg-blue-700">
              Create Study
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new study</DialogTitle>
            </DialogHeader>
            <CreateStudy />
          </DialogContent>
        </Dialog>

        {/* Edit Study (placeholder) */}
        <Dialog>
          <DialogTrigger>
            <Button className="bg-custom-black text-custom-primary hover:bg-gray-300">
              Edit Study
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit a study</DialogTitle>
            </DialogHeader>
            {/* TODO: Add edit study form here */}
            <EditStudy />
          </DialogContent>
        </Dialog>
      </div>

      {/* Studies List */}
      <div className="w-[60%] flex flex-col gap-5">
        {doctor?.studies.length === 0 ? (
          <p className="text-sm text-custom-gray">No studies created yet.</p>
        ) : (
          doctor?.studies.map((study) => (
            <div
              key={study.id}
              className="border p-4 rounded-xl flex flex-col gap-1 hover:shadow-lg transition"
            >
              <p className="font-semibold">{study.title}</p>
              <p className="text-sm text-custom-gray">{study.description}</p>
              <span className="text-xs font-semibold uppercase text-custom-black">
                {study.status.replace("_", " ")}
              </span>
              {study.dueDate && (
                <p className="text-xs text-custom-gray">
                  Due: {new Date(study.dueDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default DoctorDashboardPage;
