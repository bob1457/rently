'use client'

import React, { useMemo, useState } from 'react'
import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal'
import Heading from '../Heading'
import { categories } from '../navbar/Categories'
import CategoryInput from '../inputs/CategoryInput'
import { FieldValue, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CountrySelect from '../inputs/CountrySelect'
import dynamic from 'next/dynamic'
import Counter from '../inputs/Counter'
import ImageUpload from '../inputs/ImageUpload'
import Input from '../inputs/Input';
import toast from 'react-hot-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
// import Map from '../ui/Map'

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTIONS = 4,
    PRICE = 5
}

const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal()

    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(STEPS.CATEGORY)
    const onBack = () => {
        setStep((value) => value -1)
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathRoomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',           
        }
    })

    const category = watch('category')
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathRoomCount = watch('bathRoomCount');   
    const imageSrc = watch('imageSrc');

    // const Map = useMemo(() => dynamic(() => import('../ui/Map'), {ssr: false}), [location])
    const Map = useMemo(() => dynamic(() => import('../ui/Map'), { 
        ssr: false 
      }), [location]);

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onNext = () => {
        setStep((value) => value + 1)
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step != STEPS.PRICE) {
            return onNext()
        }

        setIsLoading(true)

        console.log(data)

        axios.post('/api/listings', data)
                .then(() => {
                    toast.success('Listing created!')                    
                    router.refresh()
                    reset()
                    setStep(STEPS.CATEGORY)
                    rentModal.onClose()
                })
                .catch((error) => toast.error('something went wrong'))
                .finally(() => setIsLoading(false))
    }

    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE) {
            return 'Create'
        }

        return 'Next'
    }, [step])

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY) {
            return undefined
        }
        return 'Back'
    }, [step])

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading 
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        {/* {item.label} */}
                        <CategoryInput 
                            onClick={(category)=> setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    if(step === STEPS.LOCATION) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Where is your place located?"
                    subtitle="Help guests find you!"
                />                
                <CountrySelect 
                    value={location} 
                    onChange={(value) => setCustomValue('location', value)} 
                />
                <Map center={location?.latlng} />
            </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Please show more basics of your place"
                    subtitle="What amenities can guests use?"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests do you allow?"
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                 />
                 <hr className="border-neutral-200" />
                 <Counter
                    title="Bedrooms"
                    subtitle="How many bedrooms do you have?"
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                 />
                 <hr className="border-neutral-200" />
                 <Counter
                    title="Bathrooms"
                    subtitle="How many bedrooms do you have?"
                    value={ bathRoomCount}
                    onChange={(value) => setCustomValue('bathRoomCount', value)}
                 />                 
            </div>
    )}

    if(step === STEPS.IMAGES) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Add a photo of your place"
                    subtitle="Show guests what your place looks like!"
                />
                <ImageUpload
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div>
    )}

    if(step === STEPS.DESCRIPTIONS) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How would you describe your place to guests"
                    subtitle="Write a short description of your place"
                />
                <Input 
                    id="title"
                    label="Title"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    type='text'
                    required
                />
                <hr className="border-neutral-200" />
                <Input
                    id="description"
                    label="Description"
                    register={register}
                    disabled={isLoading}
                    errors={errors}
                    type='textarea'
                    required
                />
            </div>
        )}

    if(step === STEPS.PRICE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="How much do you want to charge?"
                    subtitle="Set a price for your place"
                />
                <Input 
                    id="price"
                    label="Price"
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }

  return (
    <Modal 
        isOpen = {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction = {step === STEPS.CATEGORY ? undefined : onBack}
        title='Rent your home'
        body={bodyContent}
    />
  )
}

export default RentModal
