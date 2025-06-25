import { z } from "zod";

// Projects
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clienteName: z.string(),
    description: z.string()
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        projectName: true,
        clienteName: true,
        description: true
    })
);

export type Project = z.infer<typeof projectSchema>;

export type ProjectFormData = Pick<Project, "projectName" | "clienteName" | "description">;