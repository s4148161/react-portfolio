import { ImBin, ImCross } from 'react-icons/im';
import { AiTwotoneDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi';
import { useAppContext } from '../context/items-context';
import { useState } from 'react';
import { Field, Formik, Form } from "formik";
import { validater, validateTitle, Schema } from '../lib/validation';
import { parseISO } from 'date-fns'


const EventPopUp = (props) => {
    const { id, title, subject, description, category, grading, time, date, duration, recurringDays, endTime, location, color } = props;
    const { items, setItems } = useAppContext();

    const traits = {id:id,title:title,subject:subject,description:description,location:location,category:category,grading:grading,time:time,date:date,duration:duration,recurringDays:recurringDays, endTime:endTime, color:color}

    const [ editable, setEditable ] = useState(false)

    /* const listTraits = (errors, touched) => {
        let counter = 0
        const incrementCounter = () => {
            counter++
        }
        if (editable === false) return (
            Object.entries(traits).map(([k, v], index) => [
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===0)&&
                <div key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border border-gray-50">{v}</dd>
                </div>,
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===1)&&
                <div key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border border-white">{v}</dd>
                </div>,
                (v!==undefined)&&incrementCounter()
            ])
        )

        if (editable === true) return (
            Object.entries(traits).map(([k, v], index) => [
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===0)&&
                <Form><div key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pointer-events-auto ">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <Field className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id={k} name={k}/>{errors.date}
                    {errors.k && touched.k ? (
                        <div className='text-red-500'>{errors.k}</div>
                    ) : null}
                </div></Form>,
                (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject'&&counter%2===1)&&
                <Form><div key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pointer-events-auto ">
                    <dt className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                    <Field className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" id={k} name={k}/>
                    {errors.k && touched.k ? (
                        <div className='text-red-500'>{errors.k}</div>
                    ) : null}
                </div></Form>,
                (v!==undefined)&&incrementCounter()
            ])
            
        )
    } */

    /* const {
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        errors,
        touched
      } = useFormik({
        initialValues: traits,

        //validationSchema: Schema,

        enableReinitialize: true,

        validate: (values) => {validater(values)},

        onSubmit: async values => {
            await new Promise((r) => setTimeout(r, 500));
            values.selected = false
            const index = items.indexOf(items.find(x => x.id === values.id))
            const _items = [...items]
            _items[index] = values
            fetch('/api/updates', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
            })
            setItems(_items)
            toggleEditable()
        },
    }); */

    const listTraits = (errors, touched, values) => {
        let counter = 0

        const incrementCounter = () => {
            counter++
        }

        const types = {
            title: "text",
            description: "text",
            category: "text",
            date: "datetime-local",
            duration: "number",
        }

        const whiteSection = (k, v, index) => {
            if (editable===false) {
                return (
                    <div key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ">
                        <dt key={index} className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border border-white">{v}</dd>
                    </div>
                )
            } else if (editable===true) {
                return (
                    <Form key={index} className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pointer-events-auto">
                        <label key={index} htmlFor={k} className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</label>
                        <Field className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" type={types[k]} name={k} /* validate={validater(v)} *//>
                        {errors.k && touched.k ? (
                            <div className='text-red-500'>{errors.k}</div>
                        ) : null}
                    </Form>
                    
                )
            }
        }

        const greySection = (k, v, index) => {
            if (editable===false) {
                return (
                    <div key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt key={index} className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 border border-gray-50">{v}</dd>
                    </div>
                )
            } else if (editable===true) {
                return (
                    <Form key={index} className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 pointer-events-auto">
                        <label key={index} htmlFor={k} className="text-sm font-medium text-gray-500">{k[0].toUpperCase()+k.substring(1)}</label> 
                        <Field className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" type={types[k]} name={k} /* validate={validater(v)} *//>
                        {errors.k && touched.k ? (
                            <div className='text-red-500'>{errors.k}</div>
                        ) : null}
                    </Form>
                    
                )
            }
        }

        const checker = (k, v, index) => {
            var element = []

            if (editable === false) {
                if (v!==undefined&&v!==""&&k!=='id'&&k!=='title'&&k!=='subject') {
                    if (counter%2===0) {
                        incrementCounter()
                        element = greySection(k, v, index)
                    } else {
                        incrementCounter()
                        element = whiteSection(k,v,index)
                    }
                }
            } else {
                if (v!==undefined&&k!=='id'&&k!=='title'&&k!=='subject') {
                    if (counter%2===0) {
                        incrementCounter()
                        element = greySection(k, v, index)
                    } else {
                        incrementCounter()
                        element = whiteSection(k,v,index)
                    }
                }
            }
            
            return element
        }

        return (
            Object.entries(traits).map(([k, v], index) => [
                checker(k, v, index)
            ])
        )
    }

    const handleDelete = (e, idToDelete) => {
        e.stopPropagation();
        const _items = items.filter((item) => item.id !== idToDelete)
        setItems(_items);
        fetch('/api/deletes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(idToDelete),
        })
    };

    const toggleSelected = () => {
        const _items = items.map((item) => {
            item.selected = false
            return item
        })
        setItems(_items)
    }

    const toggleEditable = () => {
        setEditable(!editable)
    }

    const removeEmpty = (obj) => {
        Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
        return obj;
    }
      

    return (
        <div key={id} className='overflow-hidden bg-white shadow sm:rounded-lg mt-5 w-1/3'>
            <Formik
                initialValues={traits}

                //validationSchema={Schema}
        
                enableReinitialize
        
                onSubmit={async values => {
                    await new Promise((r) => setTimeout(r, 500));
                    values.selected = false
                    values.recurringDays = recurringDays
                    values.color = color
                    const _items = [...items]
                    const index = _items.indexOf(_items.find(x => x.id === id))
                    const finalItems = _items.slice(0, index).concat(_items.slice(index+1))
                    fetch('/api/updates', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    })
                    removeEmpty(values)
                    setItems([values, ...finalItems])
                    toggleEditable()
                }}
            >
                {({ errors, touched, values }) => (
                    <div>
                        <summary className="px-4 py-5 sm:px-6 list-none flex flex-wrap items-center justify-between">
                            {
                                editable === false &&
                                <h3 className="text-lg font-medium leading-6 text-gray-900 flex flex-1 border border-white">{title!==null&&title}{subject!==null&&subject}</h3>
                            }
                            {
                                editable === true &&
                                <Form>
                                    <Field className="bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 pointer-events-auto text-lg font-medium leading-6 flex flex-1" id="title" name="title" validate={validateTitle(values)}/>
                                    {errors.title && touched.title ? (
                                        <div className='text-red-500'>{errors.title}</div>
                                    ) : null}
                                </Form>
                            }
                            
                            <div>
                                <button className="pointer-events-auto text-lg" type="button" onClick={(e) => handleDelete(e, id)}>
                                    <AiTwotoneDelete className='fill-gray-600' />
                                </button>

                                {editable===false&&<button className="pointer-events-auto text-md" type="button" onClick={() => toggleEditable()}>
                                    <FiEdit2 className='fill-gray-600 ml-2' />
                                </button>}

                                <button className="pointer-events-auto text-md" type="button" onClick={() => toggleSelected()}>
                                    <ImCross className='fill-gray-600 ml-2' />
                                </button>
                            </div>
                        </summary>
                    
                        <div className='border-t border-gray-200'>
                            {
                                listTraits(errors, touched, values)
                            }
                        </div>
                    </div>
                )}
                
            </Formik>
        </div>
    )
}

export default EventPopUp;