const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /if \(user\.department === 'ESTADISTICA'\) return <StatisticsHub \/>;/;
code = code.replace(regex, "if (['ESTADISTICA', 'ESTADISTICA_ASIC', 'DIRECTOR_ASIC'].includes(user.department)) return <StatisticsHub />;");

fs.writeFileSync('src/App.tsx', code);
console.log('HomeRouter updated for ASIC roles');
