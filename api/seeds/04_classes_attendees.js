/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('classes_attendees').del()
  const myClass = await knex.select('*').from('classes').where('class_title', '=', 'SAPR').limit(1)
  await knex('classes_attendees').insert([
    {attendees_edipi: '12345', class_id: myClass[0].class_id},
    {attendees_edipi: '22345', class_id: myClass[0].class_id},
    {attendees_edipi: '32345', class_id: myClass[0].class_id},
    {attendees_edipi: '42345', class_id: myClass[0].class_id},
    {attendees_edipi: '52345', class_id: myClass[0].class_id}
  ]);
};
