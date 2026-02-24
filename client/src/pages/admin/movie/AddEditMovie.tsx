// // import { zodResolver } from '@hookform/resolvers/zod'
// // import { useForm } from 'react-hook-form'
// // import z from 'zod'


// // export const movieSchema = z.object({
// //     title: z
// //         .string()
// //         .min(2, "title must be at least 2 characters"),
// //     description: z
// //         .string()
// //         .min(10, "Description must be at least 10 characters"),
// //     duration: z
// //         .coerce.number()
// //         .positive("Duration must be greater than 0"),
// //     type: z
// //         .string()
// //         .min(2, "Type is required"),
// //     language: z
// //         .string()
// //         .min(2, "Language is required"),
// //     genre: z
// //         .string()
// //         .min(2, "Genre is required"),
// //     rating: z
// //         .coerce.number()
// //         .min(0)
// //         .max(5, "Rating must be between 0 to 5"),
// //     trailerUrl: z
// //         .url("Must be a valid Url"),
// //     releaseDate: z
// //         .string()
// //         .refine((date) => !isNaN(Date.parse(date)), {
// //             message: "invalid release date"
// //         }),
// //     currency: z
// //         .string()
// //         .min(3)
// //         .max(3)
// //         .transform((val) => val.toUpperCase()),
// //     poster: z
// //         .instanceof(File)
// //         .optional()
// //         .refine(
// //             (file) => !file || file.size <= 5 * 1024 * 1024,
// //             { message: "Max 5MB" }
// //         )
// // })

// // export type MovieFormValues = z.infer<typeof movieSchema>

// // type MovieFormProps = {
// //     initialData?: MovieFormValues
// //     onSubmit?: (data: MovieFormValues) => void
// //     isLoading: boolean
// // }

// // const AddEditMovie = ({
// //     initialData,
// //     onSubmit,
// //     isLoading,
// // }: MovieFormProps) => {


// //     const form = useForm<MovieFormValues>({
// //         resolver: zodResolver(movieSchema),
// //         defaultValues: {
// //             title: "",
// //             description: "",
// //         }
// //     })





// //     return (
// //         <div>AddEditMovie</div>
// //     )
// // }

// // export default AddEditMovie




// "use client"

// import { useEffect } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { movieSchema, MovieFormValues } from "./movieSchema"

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"

// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"

// type MovieFormProps = {
//     initialData?: MovieFormValues
//     onSubmit: (data: MovieFormValues) => void
//     isLoading?: boolean
// }

// export default function MovieForm({
//     initialData,
//     onSubmit,
//     isLoading,
// }: MovieFormProps) {

//     const form = useForm<MovieFormValues>({
//         resolver: zodResolver(movieSchema),
//         defaultValues: {
//             title: "",
//             description: "",
//             releaseYear: "",
//             duration: "",
//             genre: "",
//         },
//     })

//     // ✅ For Edit Mode
//     useEffect(() => {
//         if (initialData) {
//             form.reset(initialData)
//         }
//     }, [initialData, form])

//     return (
//         <Form {...form} >
//             <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-6"
//             >

//                 {/* Title */}
//                 < FormField
//                     control={form.control}
//                     name="title"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Title </FormLabel>
//                             < FormControl >
//                                 <Input placeholder="Movie title" {...field} />
//                             </>
//                             < FormMessage />
//                         </FormItem>
//                     )
//                     }
//                 />

//                 {/* Description */}
//                 <FormField
//                     control={form.control}
//                     name="description"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Description </FormLabel>
//                             < FormControl >
//                                 <Textarea placeholder="Movie description" {...field} />
//                             </FormControl>
//                             < FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 {/* Release Year */}
//                 <FormField
//                     control={form.control}
//                     name="releaseYear"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Release Year </FormLabel>
//                             < FormControl >
//                                 <Input placeholder="2024" {...field} />
//                             </FormControl>
//                             < FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 {/* Duration */}
//                 <FormField
//                     control={form.control}
//                     name="duration"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Duration(minutes) </FormLabel>
//                             < FormControl >
//                                 <Input placeholder="120" {...field} />
//                             </FormControl>
//                             < FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 {/* Genre */}
//                 <FormField
//                     control={form.control}
//                     name="genre"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Genre </FormLabel>
//                             < FormControl >
//                                 <Input placeholder="Action" {...field} />
//                             </FormControl>
//                             < FormMessage />
//                         </FormItem>
//                     )}
//                 />

//                 < Button type="submit" disabled={isLoading} >
//                     {initialData ? "Update Movie" : "Add Movie"}
//                 </Button>

//             </form>
//         </Form>
//     )
// }