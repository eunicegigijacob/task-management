const { z } = require("zod");

const addTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),

  description: z.string().optional(),
  due_date: z
    .string()
    .datetime({ message: "Invalid due date format. Use YYYY-MM-DD" })
    .min(1, { message: "Due date is required" }),
  status: z.string().optional(),
});

const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  due_date: z
    .string()
    .datetime({ message: "Invalid due date format. Use YYYY-MM-DD" })
    .optional(),
  status: z.string().optional(),
});

module.exports = {
  addTaskSchema,
  updateTaskSchema,
};
