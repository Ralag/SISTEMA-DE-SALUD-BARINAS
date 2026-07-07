const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Need to add immunization route if it doesn't exist
if (!code.includes('<Route path="/immunization"')) {
  code = code.replace(
    /<Route path="\/programs"/,
    '<Route path="/immunization" element={<PageWrapper keyProp="immunization"><div className="flex-1 overflow-y-auto"><ImmunizationHub /></div></PageWrapper>} />\n              <Route path="/programs"'
  );
  fs.writeFileSync('src/App.tsx', code);
  console.log('Immunization route added');
} else {
  console.log('Immunization route exists');
}
