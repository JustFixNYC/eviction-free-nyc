import { addLocaleData } from 'react-intl';

import en from 'react-intl/locale-data/en';
import 'intl/locale-data/jsonp/en';
import es from 'react-intl/locale-data/es';
import 'intl/locale-data/jsonp/es';
import fr from 'react-intl/locale-data/fr';
import 'intl/locale-data/jsonp/fr';

addLocaleData([...en, ...es, ...fr]);
