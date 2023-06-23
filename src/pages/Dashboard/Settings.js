import { Helmet } from "react-helmet";
import { renderRoutes, matchRoutes } from "react-router-config";

import SettingsNav from "../../components/Settings/NavLink";

const nav = [
  { id: 1, tab: "/general", name: "General", active: true },
  { id: 2, tab: "/settlements", name: "Settlements", active: false },
  {
    id: 3,
    tab: "/webhooks",
    name: "API Keys & Webhooks",
    active: false,
  },
  { id: 4, tab: "/currency", name: "Currency", active: false },
];

const Settings = ({ isLoading, history, route, location }) => {
  const branch = matchRoutes(route.routes, location.pathname);
  console.log(branch);
  if (branch.length < 1) history.push("/page-not-found");

  return (
    <div className="settings">
      <Helmet>
        <title>Settings - Payercoins</title>
      </Helmet>
      <h3 className="title title-black mb-small">Settings</h3>
      <nav className="settings_nav mt-small">
        <ul className="settings_ul">
          {nav.map((item) => (
            <SettingsNav
              tab={item.tab}
              name={item.name}
              key={item.id}
              active={item.active}
            />
          ))}
        </ul>
      </nav>
      <div className="settings_pages">{renderRoutes(route.routes)}</div>
    </div>
  );
};

export default Settings;
