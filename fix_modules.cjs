const fs = require('fs');
let content = fs.readFileSync('src/components/dashboards/AdminConfigDashboard.tsx', 'utf8');

content = content.replace("                                  [key]: { ...mod, active: e.target.checked }\n                                )}\n                              )});\n                            )}}", "                                  [key]: { ...mod, active: e.target.checked }\n                                }\n                              });\n                            }}");

content = content.replace("                            modules: { ...localConfig.modules, [key]: { ...mod, name: e.target.value } }\n                          )})}", "                            modules: { ...localConfig.modules, [key]: { ...mod, name: e.target.value } }\n                          })}");

content = content.replace("                            modules: { ...localConfig.modules, [key]: { ...mod, description: e.target.value } }\n                          )})}", "                            modules: { ...localConfig.modules, [key]: { ...mod, description: e.target.value } }\n                          })}");

content = content.replace("                );\n              )})}\n            </div>", "                );\n              })}\n            </div>");

fs.writeFileSync('src/components/dashboards/AdminConfigDashboard.tsx', content);
