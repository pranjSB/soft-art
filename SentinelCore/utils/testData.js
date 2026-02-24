import { faker } from '@faker-js/faker';

export function generateUser() 
{
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    password: generateValidPassword(),
    firstName,
    lastName,
    country: 'US',
    phone: faker.string.numeric(10),
    residenceCountry: 'US'
  };
}

function generateValidPassword() {
  const upper = faker.string.alpha({ length: 1, casing: 'upper' });
  const lower = faker.string.alpha({ length: 1, casing: 'lower' });
  const number = faker.string.numeric(1);
  const punctuation = faker.helpers.arrayElement(['!', '@', '#', '$', '%']);
  const middle = faker.string.alphanumeric(6); // keeps total under 18

  return `${upper}${lower}${number}${punctuation}${middle}`;
}
