#!usr/bin/ruby

#------------------------------------------------------------------------------
#Author: dinhtruong411
#Date: 17/08/2016
#
#Origin input:
# => name_list: type is Hash with Key is Position and Value is Member's name
# => dob_list:  type is Array with each element is Date of Birth correspond to
#               Member's name in name_list
#Methods:
# => search_by_position:
#   => Input is position's name
#   => Output is list of member's profile at this position
# => search_by_name:
#   => Input is string can be a part of Member's name
#   => Output is list of member's profile of members have this name
# => add_member: Add new member to name_list, dob_list,
#                Position default is Member
#   =>  Input is real name and Date of birth (type: dd/mm/yyyy)
# => save: save @name_list and @dob_list to names_list and dobs_list
#   => Input name of variables you want use to save
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
    resulePosition = [];
    @name_list.each_key do |element|
      if element.include? position
        resulePosition.push(element)
      end
    end
    unless resulePosition.empty?
      puts "\nList member of #{position} keyword:"
      resulePosition.each do |element|
        index = @name_list.keys.index(element)
        Team_Manager.show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    else
      puts "#{position} position haven\'t in list"
    end
  end

  def search_by_name(name)
    name = name.capitalize
    resuleName = [];
    @name_list.each_value do |element|
      if element.include? name
        resuleName.push(element)
      end
    end
    unless resuleName.empty?
      puts "\nList member of #{name} keyword"
      resuleName.each do |element|
        index = @name_list.values.index(element)
        Team_Manager.show_profile(index, @name_list, @dob_list)
      end
      puts "\n"
    else
      puts "Nobody has name is #{name}"
    end
  end

  def add_member(name, dob)
    if Team_Manager.Check_valid_date(dob)
      resulePosition = [];
      @name_list.each_key do |element|
        if element.include? 'Member'
          resulePosition.push(element)
        end
      end
      id = "Member" + (resulePosition.length + 1).to_s
      @name_list.update({id => name})
      @dob_list.push(dob)
      puts "#{name} has been added."
    else
      puts 'Add new member failed: Date must real and type dd/mm/yyy'
    end
  end

  def save(names_list, dobs_list)
    names_list  = @name_list
    dobs_list   = @dob_list
  end

  def export(file_name)
    begin
      aFile = File.open(file_name + ".txt", "a")
      File.delete(file_name + ".txt", "a")
      raise
    rescue
      aFile = File.new(file_name + ".txt", "a")
    ensure
      @name_list.each_key do |element|
        index = @name_list.keys.index(element)
        position = @name_list.keys.at(index)
        name     = @name_list.values.at(index)
        dob      = @dob_list.at(index)
        aFile.syswrite("#{position} \t #{name} \t #{dob}\n")
      end
    end
  end

  def Team_Manager.birthday_days_left(day)
    dd    = day.slice(0,2).to_i
    mm    = day.slice(3,2).to_i

    now = Time.now

    if mm < now.month
      bd_year = now.year + 1
      bd_date = Time.new(bd_year, mm, dd)
    elsif mm > now.month
      bd_date = Time.new(now.year, mm, dd)
    elsif dd == now.day
      bd_date = false
    elsif dd < now.day
      bd_year = now.year + 1
      bd_date = Time.new(bd_year, mm, dd)
    else
      bd_date = Time.new(now.year, mm, dd)
    end

    if bd_date
      ((bd_date - now)/86400).to_i
    else
      0
    end
  end

  def Team_Manager.show_profile(index, name_list, dob_list)
    position = name_list.keys.at(index)
    name     = name_list.values.at(index)
    dob      = dob_list.at(index)
    bd_days_left = Team_Manager.birthday_days_left(dob)
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

  def Team_Manager.Check_valid_date(day)
    status = false
    if day.length == 10
      if day.index("/") == 2 && day.rindex("/") == 5
        month_31days = ["01", "03", "05", "07", "08", "10", "12"]
        month_30days = ["04", "06", "09", "11"]
        dd    = day.slice(0,2).to_i
        mm    = day.slice(3,2)
        yyyy  = day.slice(6,4).to_i

        if yyyy.to_s.length == 4
          if month_31days.include? mm
            status = true if dd >= 1 && dd <= 31
          elsif month_30days.include? mm
            status = true if dd >= 1 && dd <= 30
          elsif mm == "02"
            if yyyy % 4 == 0
              status = true if dd >= 1 && dd <= 29
            else
              status = true if dd >= 1 && dd <= 28
            end
          end
        end
      end
    end
    status
  end
end
