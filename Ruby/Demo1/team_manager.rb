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
#   => Output is list of member's profile of members have this name
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


class Team_Manager
  def initialize(name_list, dob_list)
    @name_list = name_list
    @dob_list = dob_list
  end

  def search_by_position(position)
    position = position.capitalize
    resule_position = []
    @name_list.each_key do |element|
      if element.include? position
        resule_position.push(element)
      end
    end
    if resule_position.empty?
      puts "#{position} position haven\'t in list"
    else
      puts "\nList member of #{position} keyword:"
      resule_position.each do |element|
        index = @name_list.keys.index(element)
        show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    end
  end

  def search_by_name(name)
    name = name.capitalize
    resule_name = []
    @name_list.each_value do |element|
      if element.include? name
        resule_name.push(element)
      end
    end
    if resule_name.empty?
      puts "Nobody has name is #{name}"
    else
      puts "\nList member of #{name} keyword"
      resule_name.each do |element|
        index = @name_list.values.index(element)
        show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    end
  end

  def add_member(name, dob)
    if check_valid_date(dob)
      resule_position = [];
      @name_list.each_key do |element|
        resule_position.push(element) if element.include? 'Member'
      end
      id = "Member" + (resule_position.length + 1).to_s
      @name_list.update({id => name})
      @dob_list.push(dob)
      puts "#{name} has been added."
    else
      puts 'Add new member failed: Date must real and type dd/mm/yyyy'
    end
  end

  def export(file_name)
    begin
      File.delete(file_name + ".txt", "a")
      raise
    rescue
      file = File.new(file_name + ".txt", "a")
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

  def birthday_days_left(day)
    dd    = day.slice(0,2).to_i
    mm    = day.slice(3,2).to_i

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
  private :birthday_days_left

  def show_profile(index, name_list, dob_list)
    position = name_list.keys.at(index)
    name     = name_list.values.at(index)
    dob      = dob_list.at(index)
    bd_days_left = birthday_days_left(dob)
    puts  "Profile:",
          "Name: #{name}",
          "Position: #{position}",
          "Date of Birth: #{dob}"
    if bd_days_left == 0
      puts "Happy Birthday!!!!!"
    else
      puts "#{bd_days_left} days left to birthday"
    end
  end
  private :show_profile

  def check_valid_date(day)
    status = false
    if day.count('/') == 2
      removed_slash_day = day.tr('/', '')
      unless removed_slash_day =~ /\D/
        if (8..10).include? day.length
          month_31days = [1, 3, 5, 7, 8, 10, 12]
          month_30days = [4, 6, 9, 11]
          first_slash_index = day.index("/")
          second_slash_index = day.rindex("/")

          dd_length = first_slash_index
          mm_length = second_slash_index - first_slash_index - 1
          yyyy_length = day.length - second_slash_index - 1

          dd = day.slice(0, dd_length).to_i
          mm = day.slice(first_slash_index +1, mm_length).to_i
          yyyy = day.slice(second_slash_index + 1, yyyy_length).to_i

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
  private :check_valid_date
end
