require 'test_helper'

class StaticPagesControllerTest < ActionDispatch::IntegrationTest

	def setup
		@default_title = 'Ruby on Rails Tutorial Sample App'
	end

  test "should get home" do
    get static_pages_home_url
    assert_response :success
    assert_select "title", "Home | Dinhtruong411\'s Page"
  end

  test "should get help" do
    get static_pages_help_url
    assert_response :success
    assert_select "title", "Help | Dinhtruong411\'s Page"
  end

  test "should get about" do
    get static_pages_about_url
    assert_response :success
    assert_select "title", "About | Dinhtruong411\'s Page"
  end

end
