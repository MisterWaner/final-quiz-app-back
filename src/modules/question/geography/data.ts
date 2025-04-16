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
            flags: { svg: country.flags.svg, png: '' },
            region: country.region,
        }));

    return europeanDatas;
}
