import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DeleteStudy, GetStudyById, UpdateStudy } from "@/api/study";
import { Pencil, Trash2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState, type SetStateAction } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "../ui/button";
import { GetAllPatients } from "@/api/doctor";
import Spinner from "../Spinner";
import { StudyStatus } from "@/constants";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toaster from "../Toaster";

/* ---------------- SCHEMA ---------------- */

const EditStudySchema = z.object({
  title: z.string().min(3),
  description: z.string().min(5),
  instructions: z.string().min(5),
  patient: z.string(),
  dueDate: z.string().optional(),
  status: z.string(),
});

type EditStudyInputs = z.infer<typeof EditStudySchema>;

interface EditStudyProps {
  sid: string;
  setEditOpen: React.Dispatch<SetStateAction<boolean>>;
}

/* ---------------- COMPONENT ---------------- */

const EditStudy = ({ sid, setEditOpen }: EditStudyProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const client = useQueryClient();

  const { data: study, isLoading } = useQuery({
    queryKey: ["STUDY", sid],
    queryFn: () => GetStudyById(sid),
  });

  const { data: patients } = useQuery({
    queryKey: ["ALL-PATIENTS"],
    queryFn: GetAllPatients,
  });

  const { mutate: SaveChanges, isPending } = useMutation({
    mutationFn: (data: EditStudyInputs) => UpdateStudy(sid, data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["DOCTORPROFILE"] });
      setIsEditing(false);
      setEditOpen(false);
      toaster("Success", "Study updated successfully");
    },
    onError: (e) => {
      toaster("Error", e.message);
    },
  });

  const { mutate: DeleteStudyMutate } = useMutation({
    mutationFn: () => DeleteStudy(sid),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["DELETESTUDY"] });
      setEditOpen(false);
      client.invalidateQueries({ queryKey: ["DOCTORPROFILE"] });
      toaster("Success", "Study deleted successfully");
    },
    onError: (e) => {
      toaster("Error", e.message);
    },
  });

  const form = useForm<EditStudyInputs>({
    resolver: zodResolver(EditStudySchema),
    defaultValues: {
      title: "",
      description: "",
      instructions: "",
      patient: "",
      dueDate: "",
      status: "",
    },
  });

  /* ---- Populate form once study loads ---- */
  useEffect(() => {
    if (study) {
      form.reset({
        title: study.title,
        description: study.description,
        instructions: study.instructions,
        patient: study.patient.id,
        dueDate: study.dueDate
          ? new Date(study.dueDate).toISOString().split("T")[0]
          : "",
        status: study.status,
      });
    }
  }, [study, form]);

  const onCancel = () => {
    if (study) {
      form.reset({
        title: study.title,
        description: study.description,
        instructions: study.instructions,
        patient: study.patient.id,
        dueDate: study.dueDate
          ? new Date(study.dueDate).toISOString().split("T")[0]
          : "",
        status: study.status,
      });
    }
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="">
      {/* -------- EDIT TOGGLE -------- */}
      {!isEditing && (
        <div className=" flex justify-end items-center">
          <button
            onClick={() => DeleteStudyMutate()}
            className="p-2 rounded-full hover:bg-muted cursor-pointer"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>

          <button
            onClick={() => setIsEditing(true)}
            className=" p-2 rounded-full hover:bg-muted cursor-pointer"
          >
            <Pencil size={18} />
          </button>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => SaveChanges(data))}
          className="flex flex-col gap-4 "
        >
          {/* -------- TITLE -------- */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <input
                    {...field}
                    disabled={!isEditing}
                    className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------- DESCRIPTION -------- */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    disabled={!isEditing}
                    className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------- INSTRUCTIONS -------- */}
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    disabled={!isEditing}
                    className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------- PATIENT -------- */}
          <FormField
            control={form.control}
            name="patient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patient</FormLabel>
                <FormControl>
                  <Select
                    disabled={!isEditing}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={study?.patient.username} />
                    </SelectTrigger>
                    <SelectContent className=" disabled:bg-muted">
                      {patients?.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.username}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------- DUE DATE -------- */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <input
                    type="date"
                    {...field}
                    disabled={!isEditing}
                    className="w-full border rounded-lg px-3 py-2 disabled:bg-muted"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    disabled={!isEditing}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {StudyStatus.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* -------- ACTION BUTTONS -------- */}
          {isEditing && (
            <div className="flex gap-2 mt-2">
              <Button type="submit">
                {isPending ? <Spinner /> : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                <X size={16} className="mr-1" />
                Cancel
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default EditStudy;
