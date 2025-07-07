
import { z } from "zod";

// Auth and Users
export const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string(),
})

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;    
export type ConfirmToken = Pick<Auth, "token">;
//Task

export const TaskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]);
export type TaskStatus = z.infer<typeof TaskStatusSchema>

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    status: TaskStatusSchema,
    project: z.string(),
    createdAt: z.string(),
    updatedAt: z.string()
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "taskName" | "description" >;
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