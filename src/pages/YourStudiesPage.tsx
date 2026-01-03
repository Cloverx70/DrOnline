import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { IStudy } from "@/api/study";
import { Label } from "@/components/ui/label";
import Spinner from "@/components/Spinner";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const YourStudiesPage = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthStatus();

  useEffect(() => {
    if (isLoading) return;

    if (!user) navigate("/");
    if (user?.role === "doctor") navigate("/");
  }, [user, navigate, isLoading]);

  if (isLoading) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="w-full min-h-screen p-10 font-lexend">
      <h1 className="text-3xl font-bold mb-6">Your Studies</h1>

      {user?.receivedStudies && user.receivedStudies.length > 0 ? (
        <div className="flex flex-col gap-4">
          {user.receivedStudies.map((study: IStudy) => (
            <Dialog key={study.id}>
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

                  {study.doctor?.username && (
                    <p className="text-xs text-custom-gray">
                      Doctor: {study.doctor.username}
                    </p>
                  )}
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{study.title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                  {/* -------- TITLE -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Title</Label>
                    <input
                      value={study?.title ?? ""}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                    />
                  </div>

                  {/* -------- DESCRIPTION -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Description</Label>
                    <textarea
                      value={study?.description ?? ""}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                    />
                  </div>

                  {/* -------- INSTRUCTIONS -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Instructions</Label>
                    <input
                      value={study?.instructions ?? "—"}
                      disabled
                      className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                    />
                  </div>

                  {/* -------- PATIENT -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Patient</Label>
                    <Select disabled value={study?.patient?.id}>
                      <SelectTrigger className="w-full disabled:bg-muted">
                        <SelectValue placeholder={study?.patient?.username} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={study?.patient?.id}>
                          {study?.patient?.username}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* -------- DUE DATE -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Due Date</Label>
                    <input
                      type="date"
                      disabled
                      value={
                        study?.dueDate
                          ? new Date(study.dueDate).toISOString().split("T")[0]
                          : ""
                      }
                      className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                    />
                  </div>

                  {/* -------- STATUS -------- */}
                  <div className="flex flex-col gap-1">
                    <Label>Status</Label>
                    <Select disabled value={study?.status}>
                      <SelectTrigger className="w-full disabled:bg-muted">
                        <SelectValue
                          placeholder={study?.status?.replace("_", " ")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={study?.status}>
                          {study?.status?.replace("_", " ")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          <p className="text-sm text-custom-gray">
            You have no studies assigned yet.
          </p>
        </div>
      )}
    </section>
  );
};

export default YourStudiesPage;
