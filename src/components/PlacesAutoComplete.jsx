import React, { useEffect, useState } from 'react';
import { getZipCode, getGeocode, getDetails } from 'use-places-autocomplete';
import AutoComplete from 'react-google-autocomplete';

function PlacesAutoComplete({ onPlaceSelect, zipCode, address, city }) {
	const handlePlaceSelected = (data) => {
		if (!data) return;
		if (data.place_id) {
			getGeocode({
				placeId: data.place_id,
			})
				.then((result) => {
					const city = getCity(result[0]?.address_components);
					console.log('result------->', result[0].formatted_address);
					const zipCode = getZipCode(result[0], false);
					onPlaceSelect({
						...data,
						postcode: zipCode,
						city,
					});
				})
				.catch((e) => console.log(e));
		}
		if (zipCode && address) {
			onPlaceSelect({
				...data,
				postcode: zipCode,
				city,
			});
		}
	};
	const getCity = (address_components = []) => {
		const city = address_components.find((component) =>
			component.types.includes('locality')
		);
		return city?.long_name || '';
	};

	return (
		<>
            <AutoComplete
				// placeholder={`${address && zipCode}  ${zipCode,address} : "Add Location" `}
				defaultValue={address ? `${zipCode},${address}}` : ''}
				placeholder={`please select your address`}
				className='block   w-full border-0 outline-none   py-3 text-base   sm:flex-1'
				apiKey='AIzaSyCZ44yB_6Zqh9VSYqB6zhfPyxtK5hOwsL0'
				options={{
					types: [],
				}}
				onPlaceSelected={handlePlaceSelected}
			/>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				fill='none'
				viewBox='0 0 24 24'
				strokeWidth={1.5}
				stroke='currentColor'
				className='w-10 h-10 text-orange-400 '
				onClick={handlePlaceSelected}>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
				/>
			</svg>
		</>
	);
}

export default PlacesAutoComplete;
