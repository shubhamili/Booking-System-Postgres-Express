import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button } from '../../../components/ui/button'


export const movieSchema = z.object({
    title: z
        .string()
        .min(2, "title must be at least 2 characters"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
    duration: z
        .number()
        .positive("Duration must be greater than 0"),
    type: z
        .string()
        .min(2, "Type is required"),
    language: z
        .string()
        .min(2, "Language is required"),
    genre: z
        .string()
        .min(2, "Genre is required"),
    rating: z
        .number()
        .min(0)
        .max(5, "Rating must be between 0 to 5"),
    trailerUrl: z
        .url("Must be a valid Url"),
    releaseDate: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "invalid release date"
        }),
    currency: z
        .string()
        .min(3)
        .max(3)
        .transform((val) => val.toUpperCase()),
    poster: z
        .instanceof(File)
        .optional()
        .refine(
            (file) => !file || file.size <= 5 * 1024 * 1024,
            { message: "Max 5MB" }
        )
})

export type MovieFormValues = z.infer<typeof movieSchema>


export const defaultMovieValues = {
    title: "",
    description: "",
    duration: 0,//chnged
    type: "",
    language: "",
    genre: "",
    rating: 0,//chnaged
    trailerUrl: "",
    releaseDate: "",
    currency: "INR",
    poster: undefined,
}

// type MovieFormProps = {
//     initialData?: MovieFormValues
//     onSubmit?: (data: MovieFormValues) => void
//     isLoading: boolean
// }

const AddEditMovie = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<MovieFormValues>({
        resolver: zodResolver(movieSchema)
    })
    const onSubmit = (data: MovieFormValues) => {
        try {
            console.log('form', data)


            // const 


        } catch (error: any) {
            console.log('error', error)
        }
    }

    const values = watch()

    console.log(values)
    return (
        <>
            <h2 className='text-xl'>Add Movie</h2>

            <form
                className='flex flex-col gap-4 m-5'
                onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <Label className='m-1' htmlFor="">Title</Label>
                    <Input
                        type="text"
                        {...register("title")}
                    />
                    {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="">Description</Label>
                    <textarea
                        className='w-full p-2'
                        {...register("description")}
                    ></textarea>
                    {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="duration">Duration</Label>
                    <Input
                        type="number"
                        {...register("duration", { valueAsNumber: true })}
                    />
                    {errors.duration && <p className="text-red-400 text-sm mt-1">{errors.duration.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="Type">Type</Label>
                    <Input type="text"
                        {...register("type")} />
                    {errors.type && <p className="text-red-400 text-sm mt-1">{errors.type.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="language">Language</Label>
                    <Input type="text"
                        {...register("language")} />
                    {errors.language && <p className="text-red-400 text-sm mt-1">{errors.language.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="genre">Genre</Label>
                    <Input type="text"
                        {...register("genre")} />
                    {errors.genre && <p className="text-red-400 text-sm mt-1">{errors.genre.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="rating">Rating</Label>
                    <Input type="number"
                        {...register("rating", { valueAsNumber: true })} />
                    {errors.rating && <p className="text-red-400 text-sm mt-1"> {errors.rating.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="trailerUrl">Trailer Url</Label>
                    <Input type="text"
                        {...register("trailerUrl")} />
                    {errors.trailerUrl && <p className="text-red-400 text-sm mt-1">{errors.trailerUrl.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="releaseDate">Release Date</Label>
                    <Input type="date" {...register("releaseDate")} />
                    {errors.releaseDate && <p className="text-red-400 text-sm mt-1">{errors.releaseDate.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="currency">Currency</Label>
                    <Input type="text" {...register("currency")} />
                    {errors.currency && <p className="text-red-400 text-sm mt-1">{errors.currency.message}</p>}
                </div>
                <div>
                    <Label className='m-1' htmlFor="poster">Poster</Label>
                    <Input
                        type="file"
                        onChange={(e) => {
                            setValue("poster", e.target.files?.[0])
                        }}
                    />
                    {errors.poster && <p className="text-red-400 text-sm mt-1">{errors.poster.message}</p>}
                </div>

                <Button type="submit">Submit</Button>
            </form>

        </>
    )

}


export default AddEditMovie






















