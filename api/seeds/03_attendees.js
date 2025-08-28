/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('attendees').del()
  await knex('attendees').insert([
    {attendees_edipi: '12345', email: '1@gmail.com', phone_number: '91855555551', first_name: 'john', last_name: 'doe', middle_initial: 'f', date: '2000-01-01', branch: 'space force', rank: 'e1', card_expiration: '2026-01-01'},
    {attendees_edipi: '22345', email: '2@gmail.com', phone_number: '91855555552', first_name: 'jacob', last_name: 'smith', middle_initial: 's', date: '2001-01-01', branch: 'army', rank: 'e2', card_expiration: '2026-01-02'},
    {attendees_edipi: '32345', email: '3@gmail.com', phone_number: '91855555553', first_name: 'jinglehimer', last_name: 'jackson', middle_initial: 'b', date: '2002-01-01', branch: 'navy', rank: 'e3', card_expiration: '2026-01-03'},
    {attendees_edipi: '42345', email: '4@gmail.com', phone_number: '91855555554', first_name: 'smith', last_name: 'rome', middle_initial: 'v', date: '2003-01-01', branch: 'marines', rank: 'e4', card_expiration: '2026-01-04'},
    {attendees_edipi: '52345', email: '5@gmail.com', phone_number: '91855555555', first_name: 'josh', last_name: 'donk', middle_initial: 'd', date: '2004-01-01', branch: 'air force', rank: 'e5', card_expiration: '2026-01-05'}
  ]);
};
