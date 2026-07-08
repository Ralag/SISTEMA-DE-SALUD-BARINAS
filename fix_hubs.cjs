const fs = require('fs');

const files = [
  'src/components/EpidemiologyHub.tsx',
  'src/components/StatisticsHub.tsx',
  'src/components/ImmunizationHub.tsx',
  'src/components/LogisticsHub.tsx',
  'src/components/HRHub.tsx',
  'src/components/SACSHub.tsx',
  'src/components/NetworksHub.tsx',
  'src/components/ProgramsHub.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('useSaaSContext')) {
    content = content.replace("import { useAppContext } from '../context/AppContext';", "import { useAppContext } from '../context/AppContext';\nimport { useSaaSContext } from '../context/SaaSContext';");
    if (!content.includes('useSaaSContext')) { // if useAppContext wasn't there
       content = "import { useSaaSContext } from '../context/SaaSContext';\n" + content;
    }
  }

  // Insert const { config } = useSaaSContext(); inside the component if not present
  const compMatch = content.match(/export default function \w+\(\) \{/);
  if (compMatch) {
    const compName = compMatch[0];
    const indexOfComp = content.indexOf(compName) + compName.length;
    
    // Check if we already have config
    const body = content.substring(indexOfComp, indexOfComp + 100);
    if (!body.includes('useSaaSContext')) {
      content = content.substring(0, indexOfComp) + "\n  const { config } = useSaaSContext();" + content.substring(indexOfComp);
    }
  }

  fs.writeFileSync(file, content);
}
