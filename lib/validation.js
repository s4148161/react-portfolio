import * as Yup from 'yup';
import { isWithinInterval, parseISO, addHours, isValid, isBefore } from 'date-fns';


export const Schema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Too Short!")
        .max(24, "Too Long!")
        .required("Required"),
    description: Yup.string()
        .min(2, "Too Short!")
        .max(250, "Too Long!"),
    category: Yup.string()
        .min(2, "Too Short!")
        .max(24, "Too Long!"),
    date: Yup.date("Invalid Date")
        .required("Required!"),
    duration: Yup.number()
        .min(0.1, "Too Short!")
        .max(17, "Too Long!")
        .required("Required!"),
    
})

export const validateTitle = (value) => {
    let error

    if (!value) {
        error = "Required!"
    } else if (value.length < 2) {
        error = "Too Short!"
    } else if (value.length > 24) {
        error = "Too Long!"
    }

    return error 
}

export const validateDescription = (value) => {
    let error

    if (value) {
        if (value.length < 2) {
            error = "Too Short!"
        } else if (value.length > 250) {
            error = "Too Long!"
        }    
    } 

    return error 
}

export const validateCategory = (value) => {
    let error

    if (value) {
        if (value.length < 2) {
            error = "Too Short!"
        } else if (value.length > 24) {
            error = "Too Long!"
        }    
    } 

    return error 
}

export const validateDate = (value) => {
    let error

    console.log("ran")

    if (value) {
        const valuesDate = parseISO(value)
        console.log(value, valuesDate)
        if (isValid(valuesDate)) {
            const todayMin = new Date(valuesDate.setHours(5,0,0,0))
            const todayMax = new Date(valuesDate.setHours(22,0,0,0))
            const today = addHours(valuesDate, values.duration)

            if (!isBefore(valuesDate, todayMax)) {
                error = "Invalid Start Time!"
            }

            if (!isWithinInterval(today, {
                start: todayMin,
                end: todayMax
            })) {
                error = "Invalid End Time, Change Duration or Start Time!"
            }
        } else {
            error = 'That date is invalid!'
        }
    } else {
        error = "Required!"
    }

    return error 
}

export const validateDuration = (value) => {
    let error

    if (!value) {
        error = "Required!"
    } else if (value < 0.1) {
        error = "Too Short!"
    } else if (value > 17) {
        error = "Too Long!"
    }

    return error 
}

export const validater = (values, k) => {
    let error
    
    if (k==="title") {
        error = validateTitle(values)
    } else if (k==="description") {
        error = validateDescription(values)
    } else if (k==="category") {
        error = validateCategory(values)
    } else if (k==="date") {
        error = validateDate(values)
    } else if (k==="duration") {
        error = validateDuration(values)
    }

    console.log(error)

    return error
}