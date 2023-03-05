import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import usePostion from '../hooks/usePostion';
import HeaderSlider from './HeaderSlider';
import HomeNavbar from './HomeNavbar';
import PlacesAutoComplete from './PlacesAutoComplete';
const user = {
	name: 'Chelsea Hagon',
	email: 'chelsea.hagon@SingleResOverview.com',
	imageUrl:
		'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};
const navigation = [
	{ name: 'Product', href: '#' },
	{ name: 'Features', href: '#' },
	{ name: 'Marketplace', href: '#' },
	{ name: 'Company', href: '#' },
];
const userNavigation = [
	{ name: 'Your Profile', href: '#' },
	{ name: 'Settings', href: '#' },
	{ name: 'Sign out', href: '#' },
];
export default function Header() {
	const navigate = useNavigate();
  const handlePlaceSelect = (data) => {

		if (data) {
			navigate(`/restaurant?city=${data.city}&zip=${data.postcode}`);
		} else {
			navigate(
				`/restaurant?city=${localStorage.getItem(
					'your_street_name'
				)}&zip=${localStorage.getItem('your_zip')}`
			);
		}
	};
	const { address, formattedAddress, location } = usePostion();
	useEffect(() => {
		if (localStorage.getItem('language')) {
		} else {
			localStorage.setItem('language', 'en');
		}
	}, []);

	const postlivelocationresturant = () => {
		navigate(`/restaurant?&zip=${address?.postcode}`);
	};

	const { t, i18n } = useTranslation();
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<div className='relative overflow-hidden bg-pink-100'>
			<div
				className='hidden lg:absolute lg:inset-0 lg:block'
				aria-hidden='true'>
				<svg
					style={{ background: '#FF2E00' }}
					className='absolute top-0 left-1/2 translate-x-64 -translate-y-8 transform '
					width={640}
					height={850}
					fill='none'
					viewBox='0 0 640 784'>
					<rect y={72} width={640} height={640} className='text-gray-50 ' />
					<rect
						x={118}
						width={404}
						height={784}
						fill='url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)'
					/>
				</svg>
			</div>

			<div className='relative pt-6 pb-16  sm:pb-24 lg:pb-32'>
				{/* ----------------- navbar ------------------  */}
				<HomeNavbar />

				<main className='mx-auto  max-w-9xl   px-4 '>
					<div className='lg:grid lg:grid-cols-12 lg:gap-8  lg:mt-4'>
						<div className='sm:text-center md:mx-auto md:max-w-2xl lg:mt-32 lg:col-span-6 lg:text-left'>
							<h1>
								<span className='mainHeadingHeader mt-1 block lg:text-4xl font-bold  xl:text-6xl'>
									<span className='block '>{t('homebannertxt')}</span>
									{/* <span className="block "> Online Essen Bestellplatform</span> */}
								</span>
							</h1>

							{/* <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
                lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
                fugiat aliqua ad ad non deserunt sunt.
              </p> */}
							<div className='mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left'>
								<form
									onSubmit={(e) => e.preventDefault()}
									action='#'
									method='POST'
									className='mt-3 sm:flex '>
									<div className=' rounded-2xl shadow-sm p-2 flex justify-center items-center w-full   bg-white border-orange-500 '>
										<label htmlFor='email' className='sr-only'>
											Email
										</label>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='w-8 h-8 font-bold lg:mr-2'>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
											/>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
											/>
										</svg>

										{/* <input
                      ref={placesRef}
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full border-0 outline-none   py-3 text-base   sm:flex-1"
                    /> */}
                    <PlacesAutoComplete
                      city={address?.city}
											address={formattedAddress}
											zipCode={address?.postcode}
											onPlaceSelect={handlePlaceSelect}
										/>
									
									</div>
								</form>
							</div>
						</div>
						<div className='relative mt-12    sm:mx-auto sm:max-w-lg lg:col-span-6 lg:mx-0  lg:mt-0 lg:p-2 lg:flex lg:max-w-none  lg:items-center '>
							<div className='relative   mx-auto w-full rounded-lg  lg:max-w-full  '>
								<HeaderSlider />
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
