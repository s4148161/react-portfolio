import {  useAppContext } from '../../context/items-context.js';
import { Field, Formik, Form } from "formik";
import { v4 as uuidv4 } from 'uuid';
import { validate, Schema } from '../../lib/validation.js';

const TaskForm = ({ initialValue }) => {
    const { items, setItems } = useAppContext();

    return (
        <Formik
            initialValues={{ title: '', description: '', category: '', date: '', duration: '', recurring: '', color: '' }}

            validationSchema={Schema}

            onSubmit={async (values, {resetForm}) => {
                await new Promise((r) => setTimeout(r, 500));
                values.id = uuidv4();
                values.type = 'task';
                values.selected = false
                fetch('/api/posts', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ values }),
                })
                const _items = [values, ...items]
                setItems(_items)
                
                resetForm({values: ''});
            }}
        >
            {({ errors, touched, values }) => (
                <Form className='w-1/2 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4'>
                    <h1 className='text-2xl mb-5 '>Add Task</h1>

                    <label className='mb-3 text-gray-600' htmlFor="title">Title</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="text" name="title" id="title" />
                    {errors.title && touched.title ? (
                        <div className='text-red-500'>{errors.title}</div>
                    ) : null}

                    <label className='mt-5 mb-3 text-gray-600' htmlFor="description">Description</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="text" name="description" id="description" />            
                    {errors.description && touched.description ? (
                        <div className='text-red-500'>{errors.description}</div>
                    ) : null}

                    <label className='mt-5 my-3 text-gray-600' htmlFor="category">Category</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="text" name="category" id="category" list="categories" />
                    {errors.category && touched.category ? (
                        <div className='text-red-500'>{errors.category}</div>
                    ) : null}
                    <datalist id="categories">
                    {
                        items.map(({id, category}) => (
                        <option key={id}>
                            {category}
                        </option>
                        ))
                    }
                    </datalist>

                    <label className='mt-5 my-3 text-gray-600' htmlFor="date">Start Time</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="datetime-local" name="date" id="date" />
                    {errors.date && touched.date ? (
                        <div className='text-red-500'>{errors.date}</div>
                    ) : null}

                    <label className='mt-5 my-3 text-gray-600' htmlFor="duration">Duration (Hours)</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="number" name="duration" id="duration" />
                    {errors.duration && touched.duration ? (
                        <div className='text-red-500'>{errors.duration}</div>
                    ) : null}

                    <label className='mt-5 my-3 text-gray-600' htmlFor="color">Colour</label>
                    <div className='flex justify-between px-10 py-5'>
                        <div className=' justify-center flex align-middle'>
                            <Field className='text-sm rounded-lg accent-red-500 ring-8 ring-red-500 text-red-500  block p-2.5 w-3/4' type="radio" name="color" value="red" />
                        </div>
                        <div>
                            <Field className='text-sm rounded-lg accent-blue-500 ring-8 ring-blue-500 text-blue-500  block p-2.5 w-3/4' type="radio" name="color" value="blue" />
                        </div>
                        <div>
                            <Field className='text-sm rounded-lg accent-green-500 ring-8 ring-green-500 text-green-500  block p-2.5 w-3/4' type="radio" name="color" value="green" />
                        </div>
                        <div>
                            <Field className='text-sm rounded-lg accent-yellow-500 ring-8 ring-yellow-500 text-yellow-500  block p-2.5 w-3/4' type="radio" name="color" value="yellow" />
                        </div>
                        <div>
                            <Field className='text-sm rounded-lg accent-purple-500 ring-8 ring-purple-500 text-purple-500  block p-2.5 w-3/4' type="radio" name="color" value="purple" />
                        </div>
                        
                    </div>
                    

                    <label className='mt-5 my-3 text-gray-600' htmlFor="recurring">Recurring?</label>
                    <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurring" id="recurring" />
                    {errors.recurring && touched.recurring ? (
                        <div className='text-red-500'>{errors.recurring}</div>
                    ) : null}

                    {
                        values!==undefined && values.recurring === true &&
                        <div className='flex justify-between'>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Monday"/>
                                Monday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Tuesday"/>
                                Tuesday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Wednesday"/>
                                Wednesday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Thursday"/>
                                Thurday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Friday"/>
                                Friday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Saturday"/>
                                Saturday
                            </label>
                            <label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="checkbox" name="recurringDays" id="recurringDays" value="Sunday"/>
                                Sunday
                            </label>
                        </div>
                    }
                    <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10 my-3' type='submit'>Add</button>
                </Form>
            )}
        </Formik>
    )
}

export default TaskForm;