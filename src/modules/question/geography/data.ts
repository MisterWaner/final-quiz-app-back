const url =
    'https://restcountries.com/v3.1/all?fields=name,flags,capital,translations,region';

export type Country = {
    name: {
        common: string;
    };
    flags: {
        png: string;
        svg: string;
    };
    capital: string[];
    region: string;
    translations?: {
        fra: {
            official: string;
            common: string;
        };
    };
};

export async function fetchGeoData(): Promise<Country[]> {
    const response = await fetch(url);
    const data: Country[] = await response.json();
    return data;
}

export async function fetchEuropeanCountries(): Promise<Country[]> {
    const data = await fetchGeoData();

    const europeanDatas = data
        .filter((country: Country) => {
            return country.region === 'Europe';
        })
        .map((country: Country) => ({
            name: { common: country?.translations?.fra.common || '' },
            capital: country.capital,
            flags: { svg: country.flags.svg, png: country.flags.png },
            region: country.region,
        }));

    return europeanDatas;
}

export async function fetchAfricanCountries(): Promise<Country[]> {
    const data = await fetchGeoData();

    const africanDatas = data
        .filter((country: Country) => {
            return country.region === 'Africa';
        })
        .map((country: Country) => ({
            name: { common: country?.translations?.fra.common || '' },
            capital: country.capital,
            flags: { svg: country.flags.svg, png: country.flags.png },
            region: country.region,
        }));

    return africanDatas;
}

export async function fetchAsianCountries(): Promise<Country[]> {
    const data = await fetchGeoData();

    const asianDatas = data
        .filter((country: Country) => {
            return country.region === 'Asia';
        })
        .map((country: Country) => ({
            name: { common: country?.translations?.fra.common || '' },
            capital: country.capital,
            flags: { svg: country.flags.svg, png: country.flags.png },
            region: country.region,
        }));

    return asianDatas;
}

export async function fetchAmericanCountries(): Promise<Country[]> {
    const data = await fetchGeoData();

    const americanDatas = data
        .filter((country: Country) => {
            return country.region === 'Americas';
        })
        .map((country: Country) => ({
            name: { common: country?.translations?.fra.common || '' },
            capital: country.capital,
            flags: { svg: country.flags.svg, png: country.flags.png },
            region: country.region,
        }));

    return americanDatas;
}

export async function fetchOceanianCountries(): Promise<Country[]> {
    const data = await fetchGeoData();

    const oceanianDatas = data
        .filter((country: Country) => {
            return country.region === 'Oceania';
        })
        .map((country: Country) => ({
            name: { common: country?.translations?.fra.common || '' },
            capital: country.capital,
            flags: { svg: country.flags.svg, png: country.flags.png },
            region: country.region,
        }));

    return oceanianDatas;
}
