import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import Spinner from "../Spinner";
import { createStudy } from "@/api/study";
import toaster from "../Toaster";
import { useAuthStatus } from "@/hooks/useAuthStatus";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateStudySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  instructions: z.string().optional(),
  patientId: z.string(),
  dueDate: z.string().optional(),
});

type CreateStudyInputs = z.infer<typeof CreateStudySchema>;

const CreateStudy = () => {
  const { data: user } = useAuthStatus();

  const createStudyForm = useForm<CreateStudyInputs>({
    resolver: zodResolver(CreateStudySchema),
    defaultValues: {
      title: "",
      description: "",
      instructions: "",
      patientId: "",
      dueDate: "",
    },
  });

  const {
    mutate: CreateStudyMutation,
    isPending,
    reset,
  } = useMutation({
    mutationFn: async (data: CreateStudyInputs) => createStudy(user.id, data),

    onSuccess: () => {
      toaster("Success", "Study created successfully");
      reset();
    },
    onError: (e) => {
      toaster("Error", e.message);
      reset();
    },
  });

  return (
    <Form {...createStudyForm}>
      <form
        onSubmit={createStudyForm.handleSubmit(
          (data) => {
            CreateStudyMutation(data);
          },
          (e) => {
            console.log(e);
          }
        )}
        className="flex flex-col gap-4 mt-4"
      >
        <FormField
          control={createStudyForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="text"
                  placeholder="Study title"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createStudyForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Study description"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createStudyForm.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Study instructions"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createStudyForm.control}
          name="patientId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Patient</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  placeholder="Study description"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createStudyForm.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <input
                  {...field}
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-custom-black text-custom-primary">
          {isPending ? <Spinner /> : "Create Study"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateStudy;
