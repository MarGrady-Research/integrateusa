import { Disclosure } from '@headlessui/react'

export default function Accordion() {
  return (
    <div className='pt-2'>
    <Disclosure>
      <Disclosure.Button className='font-raleway text-xl border-gray-700 hover:bg-gray-200 focus:bg-gray-200 border inline-flex rounded-md p-1 mr-2'>
        Options
      </Disclosure.Button>
      <Disclosure.Panel className="text-gray-500">
      <div className='pt-2'>
        <span ><input type="checkbox" disabled={true} />NYC as 32 School Districts</span>
        </div>
      </Disclosure.Panel>
    </Disclosure>
    </div>
  )
}