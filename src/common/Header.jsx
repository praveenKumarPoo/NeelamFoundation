'use client'
import {useState} from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import {useTranslations} from 'next-intl';
const TamilTransulation = {
    "Header": {
        "title": "நீலம் பண்பாட்டு மையம்",
        "Product": "அறிமுகம் கட்டம்",
        "Features": "அம்சங்கள்",
        "Registration": "பதிவு",
        "Company": "நிறுவனம்",
        "briyani_description": "பிரியாணி என்பது வெறும் உணவு மட்டுமல்ல; இது ஒரு தட்டில் ஒரு கொண்டாட்டம். இந்த காஸ்ட்ரோனமிக் பயணத்தைத் தொடங்கும்போது, ஒவ்வொரு நறுமணக் கடியின் சாரத்தையும் கைப்பற்றும் வசீகரிக்கும் தலைப்புகள் மூலம் பிரியாணியின் உலகத்தை ஆராய்வோம்.",
        "workflow": "Work flow",
        "home": "Home",
        "restaurant": "Restaurant App"
    }
}
const navigation = [
    { name: 'home', href: '/' },
    { name: 'Product', href: './product' },
    { name: 'Features', href: './features' },
    { name: 'Registration', href: '/registration' },
    { name: 'workflow', href: '/workflow' },
    { name: 'restaurant', href: '/restaurant' },
]

function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const t = TamilTransulation['Header'];
    return (
        <div>  <header className="absolute inset-x-0 top-0 z-50">
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img
                            alt=""
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            className="h-8 w-auto"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
                            {t[item.name]}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden bg-gradient-to-b from-indigo-950 to-white via-indigo-300">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                alt=""
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                className="h-8 w-auto"
                            />
                        </a>
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {t[item.name]}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
        </div>
    )
}

export default Header