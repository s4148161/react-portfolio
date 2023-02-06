import {  useAppContext } from '../../context/items-context.js';
import { Field, Formik, Form } from "formik";
import { v4 as uuidv4 } from 'uuid';

const AssignmentForm = () => {
    const { items, setItems } = useAppContext();
    return (
        <Formik
            initialValues={{ subject: '', description: '', time: '', grading: '', date: '' }}

            onSubmit={async (values, {resetForm}) => {
                await new Promise((r) => setTimeout(r, 500));
                values.id = uuidv4();
                values.type = 'assignment';
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
                <h1 className='text-2xl mb-5 '>Add Assignment</h1>

                <label className='mb-3 text-gray-600' htmlFor="subject">Subject</label>
                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="text" name="subject" id="subject" />
                {errors.subject && touched.subject ? (
                    <div className='text-red-500'>{errors.subject}</div>
                ) : null}

                <label className='mt-5 mb-3 text-gray-600' htmlFor="description">Description</label>
                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="text" name="description" id="description" />
                {errors.description && touched.description ? (
                    <div className='text-red-500'>{errors.description}</div>
                ) : null}

                <label className='mt-5 my-3 text-gray-600' htmlFor="time">Estimated time to complete (hours)</label>
                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="number" name="time" id="time"  />
                {errors.time && touched.time ? (
                    <div className='text-red-500'>{errors.time}</div>
                ) : null}

                <label className='mt-5 my-3 text-gray-600' htmlFor="time">Percentage of final grade (%)</label>
                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="number" name="grading" id="grading"  />
                {errors.grading && touched.grading ? (
                    <div className='text-red-500'>{errors.grading}</div>
                ) : null}

                <label className='mt-5 my-3 text-gray-600' htmlFor="date">Finish By Date</label>
                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-3/4' type="date" name="date" id="date" />
                {errors.date && touched.date ? (
                    <div className='text-red-500'>{errors.date}</div>
                ) : null}

                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10 my-3' type='submit'>Add</button>
            </Form>
            )}
        </Formik>
    )
}

export default AssignmentForm;