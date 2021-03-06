// Licensed under the Apache License, Version 2.0 (the "License"); you may not
// use this file except in compliance with the License. You may obtain a copy of
// the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations under
// the License.

module.exports = {

  // some basic test for the changes page. All of this and more is covered in the
  // changes.componentsSpec.react.jsx mocha tests; this is more of a sanity end-to-end test
  'Check changes filter results' : function (client) {

    var waitTime = 10000,
        newDatabaseName = client.globals.testDatabaseName,
        baseUrl = client.globals.test_settings.launch_url;
    
    client
      .loginToGUI()
      .createDocument('doc_1', newDatabaseName)
      .createDocument('doc_2', newDatabaseName)
      .createDocument('doc_3', newDatabaseName)
      .url(baseUrl + '/#/database/' + newDatabaseName + '/_changes')

      // confirm all 3 changes are there
      .waitForElementPresent('.change-box[data-id="doc_1"]', waitTime, false)
      .waitForElementPresent('.change-box[data-id="doc_2"]', waitTime, false)
      .waitForElementPresent('.change-box[data-id="doc_3"]', waitTime, false)

      // add a filter
      .click("#db-views-tabs-nav a")
      .waitForElementVisible('.js-changes-filter-field', waitTime, false)
      .setValue('.js-changes-filter-field', "doc_1")
      .click('.js-filter-form button[type="submit"]')

      // confirm only the single result is now listed in the page
      .waitForElementVisible('span.label-info', waitTime, false)
      .waitForElementPresent('.change-box[data-id="doc_1"]', waitTime, false)
      .waitForElementNotPresent('.change-box[data-id="doc_2"]', waitTime, false)
      .waitForElementNotPresent('.change-box[data-id="doc_3"]', waitTime, false)
      .end();
  }
};
