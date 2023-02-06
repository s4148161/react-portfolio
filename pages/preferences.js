import Head from "next/head";
import Navbar from '../components/navbar';
import { getSession, signIn } from 'next-auth/react'
import { useAppContext } from '../context/items-context'
import { Field, Formik, Form } from "formik";
import { useEffect } from 'react'
import Link from "next/link";


const Preferences = ({ session, settingsProp }) => {
    const { settings, setSettings } = useAppContext()

    useEffect(() => {
        setSettings(settingsProp)
    }, [settingsProp])

    return (
        <div>
            <Head>
                <title>Preferences</title>
                <meta name="description" content="Preferences" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className='bg-white px-10 md:px-20 lg:px-40'>
                <section className='min-h-screen'>
                    <Navbar />
                    <Link href="/" className='text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 mt-10 my-3'>Back</Link>
                    <Formik
                        initialValues={settingsProp}

                        onSubmit={async (values, {resetForm}) => {
                            await new Promise((r) => setTimeout(r, 500));
                            values.links = [values.links]
                            fetch('../api/settings', {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ values }),
                            })
                            setSettings(values)
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form className='w-1/2 shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4'>
                                <h1 className="text-2xl mb-3">Preferences</h1>

                                <label className='mb-3 text-gray-600' htmlFor="title">Calendar Start Time</label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="time" name="calendarStart" id="calendarStart" />
                                {errors.calendarStart && touched.calendarStart ? (
                                    <div className='text-red-500'>{errors.calendarStart}</div>
                                ) : null}

                                <label className='mb-3 text-gray-600' htmlFor="title">Calendar End Time</label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="time" name="calendarEnd" id="calendarEnd" />
                                {errors.calendarEnd && touched.calendarEnd ? (
                                    <div className='text-red-500'>{errors.calendarEnd}</div>
                                ) : null}   

                                <label className='mb-3 text-gray-600' htmlFor="title">Calendar Time Increments (minutes)</label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="number" name="calendarIncrements" id="calendarIncrements" />
                                {errors.calendarIncrements && touched.calendarIncrements ? (
                                    <div className='text-red-500'>{errors.calendarIncrements}</div>
                                ) : null}

                                <label className='mb-3 text-gray-600' htmlFor="title">Subscribed Calendar Links</label>
                                <Field className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mr-2 w-3/4' type="url" name="links" id="links" multiple/>
                                {errors.calendarIncrements && touched.calendarIncrements ? (
                                    <div className='text-red-500'>{errors.calendarIncrements}</div>
                                ) : null}  
                                <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5  text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-10 my-3' type='submit'>Save</button>
                            </Form>
                        )}
                    </Formik>
                </section>
            </main>
        </div>
    )
    
}

export const getServerSideProps = async ({req}) => {
    const session = await getSession({ req });
    
    if(!session) {
      return {
        redirect: {
          destination: '/api/auth/signin/google',
          permanent: false,
        }
      }
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    const settings = await prisma.settings.findUnique({
        where: {
          userId: user.id
        }
    })

    var settingsProp

    if (settings!==null) {
        settingsProp = settings.settingsData.values
    } else {
        settingsProp = {
            calendarStart: "05:00",
            calendarEnd: "22:00",
            calendarIncrements: "60",
            links: []
        }
    }
    
  
    return {
      props: {
        session,
        settingsProp
      }
    }
  }

export default Preferences