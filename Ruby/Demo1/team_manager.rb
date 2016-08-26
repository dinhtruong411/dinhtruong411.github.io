#!usr/bin/ruby

#------------------------------------------------------------------------------
# Author: dinhtruong411
# Date: 17/08/2016
#
# Origin input:
# => name_list: type is Hash with Key is Position and Value is Member's name
# => dob_list:  type is Array with each element is Date of Birth correspond to
#               Member's name in name_list
# Methods:
# => search_by_position:
#   => Input is position's name
#   => Output is list of member's profile at this position
# => search_by_name:
#   => Input is string can be a part of Member's name
#   => Output is list of member's profile of members with this name
# => add_member: Add new member to name_list, dob_list,
#                Position default is Member
#   =>  Input is real name and Date of birth (type: dd/mm/yyyy)
# => export: Export data to file file_name.txt
#   => Input name of file
#------------------------------------------------------------------------------
# This Class I have practice class, array, variables, Loops, naming convention,
# Conditional statements, Array, Hashes, String, File, date & time, Exceptions
#------------------------------------------------------------------------------
# Tab with 2 spaces
#------------------------------------------------------------------------------


class TeamManager
  def initialize(name_list:, dob_list:)
    @name_list = name_list
    @dob_list = dob_list
  end

  # Input is position's name
  # Output is list of member's profile at this position
  def search_by_position(position)
    position = position.capitalize
    result_position = []
    @name_list.each_key do |element|
      if element.include? position
        result_position.push(element)
      end
    end
    if result_position.empty?
      puts "#{position} position haven\'t in list"
    else
      puts "\nList member of #{position} keyword:"
      result_position.each do |element|
        index = @name_list.keys.index(element)
        show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    end
  end

  # Input is string can be a part of Member's name
  # Output is list of member's profile of members with this name
  def search_by_name(name)
    name = name.capitalize
    result_name = []
    @name_list.each_value do |element|
      if element.include? name
        result_name.push(element)
      end
    end
    if result_name.empty?
      puts "Nobody has name is #{name}"
    else
      puts "\nList member of #{name} keyword"
      result_name.each do |element|
        index = @name_list.values.index(element)
        show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    end
  end

  # add_member: Add new member to name_list, dob_list,
  #             Position default is Member
  #   Input is real name and Date of birth (type: dd/mm/yyyy)
  def add_member(name:, dob:)
    if check_valid_date(dob)
      result_position = []
      @name_list.each_key do |element|
        result_position.push(element) if element.include? 'Member'
      end
      id = 'Member' + (result_position.length + 1).to_s
      @name_list.update({id => name})
      @dob_list.push(dob)
      puts "#{name} has been added."
    else
      puts 'Add new member failed: Date must real and type dd/mm/yyyy'
    end
  end

  # export: Export data to file file_name.txt
  #   Input name of file
  def export(file_name)
    begin
      File.delete(file_name + '.txt', 'a')
      raise
    rescue
      file = File.new(file_name + '.txt', 'a')
    ensure
      @name_list.each_key do |element|
        index = @name_list.keys.index(element)
        position = @name_list.keys.at(index)
        name     = @name_list.values.at(index)
        dob      = @dob_list.at(index)
        file.syswrite("#{position} \t #{name} \t #{dob}\n")
      end
    end
  end

  # birthday_days_left: Function count days left to Birthday
  #   Input day of birth with format dd/mm/yyyy
  #   Return number of day
  private
  def birthday_days_left(date)
    first_slash_index = date.index('/')
    second_slash_index = date.rindex('/')

    dd_length = first_slash_index
    mm_length = second_slash_index - first_slash_index - 1

    dd = date.slice(0, dd_length).to_i
    mm = date.slice(first_slash_index + 1, mm_length).to_i

    now = Time.now

    if mm < now.month
      bd_year = now.year + 1
      bd_date = Time.new(bd_year, mm, dd)
    elsif mm > now.month
      bd_date = Time.new(now.year, mm, dd)
    elsif dd < now.day
      bd_year = now.year + 1
      bd_date = Time.new(bd_year, mm, dd)
    else
      bd_date = Time.new(now.year, mm, dd)
    end
    ((bd_date - now)/86400).to_i
  end

  # show_profile: Function search position with name in name_list
  #               and date of birth in dob_list at index
  #   Input:
  #     index
  #     name_list: type is Hash with Key is Position and Value is Member's name
  #     dob_list: type is Array with each element is Date of Birth correspond to
  #               Member's name in name_list.
  #   Output: Show name, position, date of birth, days left to birthday
  #           of member at index
  private
  def show_profile(index, name_list, dob_list)
    position = name_list.keys.at(index)
    name     = name_list.values.at(index)
    dob      = dob_list.at(index)
    bd_days_left = birthday_days_left(dob)
    puts  'Profile:',
          "Name: #{name}",
          "Position: #{position}",
          "Date of Birth: #{dob}"
    if bd_days_left == 0
      puts 'Happy Birthday!!!!!'
    else
      puts "#{bd_days_left} days left to birthday"
    end
  end


  # check_valid_date: Function check valid and real of date
  #                   Valid is date with format dd/mm/yyyy
  #   Input: date
  #   Return:
  #     true: if date is valid and real
  #     false: other
  private
  def check_valid_date(date)
    status = false
    if date.count('/') == 2
      removed_slash_day = date.tr('/', '')
      unless removed_slash_day =~ /\D/
        if (8..10).include? date.length
          month_31days = [1, 3, 5, 7, 8, 10, 12]
          month_30days = [4, 6, 9, 11]
          first_slash_index = date.index('/')
          second_slash_index = date.rindex('/')

          dd_length = first_slash_index
          mm_length = second_slash_index - first_slash_index - 1
          yyyy_length = date.length - second_slash_index - 1

          dd = date.slice(0, dd_length).to_i
          mm = date.slice(first_slash_index + 1, mm_length).to_i
          yyyy = date.slice(second_slash_index + 1, yyyy_length).to_i

          if yyyy.to_s.length == 4
            if month_31days.include? mm
              status = true if dd >= 1 && dd <= 31
            elsif month_30days.include? mm
              status = true if dd >= 1 && dd <= 30
            elsif mm == 2
              if yyyy % 4 == 0
                status = true if dd >= 1 && dd <= 29
              else
                status = true if dd >= 1 && dd <= 28
              end
            end
          end
        end
      end
    end
    status
  end
end
