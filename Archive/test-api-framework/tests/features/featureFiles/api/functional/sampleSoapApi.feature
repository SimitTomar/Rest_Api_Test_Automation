@smoke @regression
Feature: To be able to test country info SOAP API

  @api
  Scenario Outline: Verify that the country info API shows correct information

    When I fetch the response from Country API by specifying <Header> and <QueryParams> and method as <Method>
    And the retrieved details should match with the response from expected result file <ExpectedResult>

    Examples:
      | Header      | QueryParams      | Method          | ExpectedResult |
      | TC_1_Header | TC_1_QueryParams | CountryCurrency | TC_1_Response  |
      | TC_1_Header | TC_2_QueryParams | CountryName     | TC_2_Response  |