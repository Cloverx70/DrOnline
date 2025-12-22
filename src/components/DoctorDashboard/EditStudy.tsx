import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateStudySchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  instructions: z.string().min(5, "Description must be at least 5 characters"),
  patient: z.string().min(5, "Description must be at least 5 characters"),
  dueDate: z.string().optional(),
});

type CreateStudyInputs = z.infer<typeof CreateStudySchema>;

const EditStudy = () => {
  const createStudyForm = useForm<CreateStudyInputs>({
    resolver: zodResolver(CreateStudySchema),
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
    },
  });

  const onEditStudy = (data: CreateStudyInputs) => {
    // Add the new study to the local state (replace with API call)
  };
  return (
    <Form {...createStudyForm}>
      <form
        onSubmit={createStudyForm.handleSubmit(onEditStudy)}
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
          name="patient"
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
          Create Study
        </Button>
      </form>
    </Form>
  );
};

export default EditStudy;
