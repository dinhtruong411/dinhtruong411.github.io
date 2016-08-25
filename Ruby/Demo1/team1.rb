#!/usr/bin/ruby

#------------------------------------------------------------------------------
# Exp application of Team_Manager class.
#------------------------------------------------------------------------------
# Tab with 2 spaces
#------------------------------------------------------------------------------

load 'team_manager.rb'
# Name list
names_hash = { 'Leader'         => 'Pham Dinh Truong',
               'Deputy Leader'  => 'Dang Thi Hoa',
               'Member1'        => 'Nguyen Thi Van',
               'Member2'        => 'Trinh Thi Tuyet Diem',
               'Member3'        => 'Nguyen Thi Hong Van'
             }

# Date of birth list
dobs_array = ['13/02/1993', '19/11/1992', '02/10/1992', '12/05/1993',
              '09/08/1993']

project_team = TeamManager.new(name_list: names_hash, dob_list: dobs_array)
project_team.add_member(name: 'Ho Thi Hieu', dob: '09/10/1996')
project_team.add_member(dob: '18/8/1993', name: 'Vo Thi Tuyet')
project_team.search_by_position('member')
project_team.search_by_name('van')
project_team.export('team_list')

# Invalid date circumstances
project_team.add_member(name: 'Vo Thi Tuyet1', dob: '10/59/1993')
project_team.add_member(name: 'Vo Thi Tuyet2', dob: '10/01/1yy3')
project_team.add_member(name: 'Vo Thi Tuyet3', dob: '29/02/1993')
project_team.add_member(name: 'Vo Thi Tuyet4', dob: '31/04/1993')
